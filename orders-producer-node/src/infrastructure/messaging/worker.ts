// src/infrastructure/messaging/worker.ts
import { notifyClients } from "../websocket/ws-server";
import { OrderMessage } from "../../domain/models/order";
import { createKitchenOrderFromMessage } from "../../application/factories/order.factory";
import { ProductRepository } from "../database/repositories/product.repository";
import { getChannel, sendToDLQ } from "./amqp.connection";
import {
  addKitchenOrder,
  getRepository,
} from "../http/controllers/kitchen.controller";


export async function startWorker() {
  try {
    const channel = await getChannel();
    const queue = "orders.new";

    await channel.assertQueue(queue, { durable: true });
    channel.prefetch(1);

    console.log("📥 Worker de cocina escuchando pedidos nuevos (orders.new)...");

    channel.consume(
      queue,
      async (msg: any) => {
        if (!msg) return;
        let correlationId: string | undefined;
        try {
          const pedido: OrderMessage = JSON.parse(msg.content.toString());
          correlationId = (msg.properties && (msg.properties.correlationId || msg.properties.headers?.['x-correlation-id'])) || undefined;
          
          console.log("🍽️ Pedido recibido:", pedido.id);

          // Check if order already exists in database
          const repo = getRepository();
          const existingOrder = await repo.getById(pedido.id);

          if (existingOrder) {
            // Update existing order
            console.log(`📝 Actualizando pedido existente: ${pedido.id}`);
            
            const updatedOrder = createKitchenOrderFromMessage(pedido);
            // Preserve the current status to avoid overwriting kitchen progress
            updatedOrder.status = existingOrder.status;
            // Enrich items with preparation time seconds from products collection
            try {
              const prodRepo = new ProductRepository();
              updatedOrder.items = await Promise.all(
                (updatedOrder.items || []).map(async (it) => {
                  const product = await prodRepo.getByName(it.productName);
                  return product && product.preparationTime
                    ? { ...it, preparationTimeSeconds: product.preparationTime * 60 }
                    : it;
                })
              );
            } catch (e) {
              console.error("⚠️ No se pudieron adjuntar tiempos de preparación:", e);
            }
            
            // Remove old and create new (since there's no update method)
            await repo.remove(pedido.id);
            await repo.create(updatedOrder);

            // Notify clients about the update
            notifyClients({ type: "ORDER_UPDATED", order: updatedOrder });
            console.log(`✅ Pedido ${pedido.id} actualizado en cocina`);
          } else {
            // Create new order
            console.log(`🆕 Nuevo pedido: ${pedido.id}`);
            const kitchenOrder = createKitchenOrderFromMessage(pedido);
            // Enrich items with preparation time seconds from products collection
            try {
              const prodRepo = new ProductRepository();
              kitchenOrder.items = await Promise.all(
                (kitchenOrder.items || []).map(async (it) => {
                  const product = await prodRepo.getByName(it.productName);
                  console.log(`🔍 Buscando producto "${it.productName}":`, product ? `✅ Encontrado (prep: ${product.preparationTime}min)` : `❌ No encontrado`);
                  return product && product.preparationTime
                    ? { ...it, preparationTimeSeconds: product.preparationTime * 60 }
                    : it;
                })
              );
              console.log(`📦 Items enriquecidos:`, JSON.stringify(kitchenOrder.items, null, 2));
            } catch (e) {
              console.error("⚠️ No se pudieron adjuntar tiempos de preparación:", e);
            }
            await addKitchenOrder(kitchenOrder);

            // Notify clients about new order
            notifyClients({ type: "ORDER_NEW", order: kitchenOrder });
            console.log(`✅ Pedido ${pedido.id} agregado a cocina con estado: pending`);
          }

          channel.ack(msg);

          // Verificar si quedan pedidos en la cola
          const queueInfo = await channel.checkQueue(queue);
          if (queueInfo.messageCount === 0) {
            notifyClients({
              type: "QUEUE_EMPTY",
              message: "🕒 Esperando nuevos pedidos..."
            });
            console.log("🕒 Esperando nuevos pedidos...");
          }

        } catch (err) {
          // Manejo de errores: enviar a DLQ y nack sin requeue
          try {
            console.error("⚠️ Error procesando pedido (will DLQ):", err);
            
            let payload = msg.content;
            if (correlationId) {
              try {
                const obj = JSON.parse(msg.content.toString());
                obj._dlq = obj._dlq || {};
                obj._dlq.correlationId = correlationId;
                payload = Buffer.from(JSON.stringify(obj));
              } catch (error_) {
                // fallback: mantener payload original
                console.error("⚠️ Error agregando correlationId a DLQ:", error_);
              }
            }
            await sendToDLQ(channel, "orders.failed", payload);
          } catch (error_) {
            console.error("⚠️ Error enviando a DLQ:", error_);
          } finally {
            channel.nack(msg, false, false);
          }
        }
      },
      { noAck: false }
    );
  } catch (err) {
    console.error("❌ Error en el worker:", err);
  }
}

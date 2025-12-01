import express from "express";
import cors from "cors";
import { getKitchenOrders, setOrderRepository } from "./controllers/kitchen.controller";
import { getProducts, getAllProducts, getProductById } from "./controllers/product.controller";
import { startWorker } from "./worker";
import MongoSingleton from "./db/mongo";
import { MongoOrderRepository } from "./repositories/mongo.order.repository";

// correlation id middleware
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

// attach or propagate correlation id for tracing
app.use((req, _res, next) => {
  const header = req.headers["x-correlation-id"] as string | undefined;
  if (!header) (req.headers as any)["x-correlation-id"] = uuidv4();
  next();
});

app.get("/kitchen/orders", getKitchenOrders);

// Product routes
app.get("/api/products", getProducts);
app.get("/api/products/all", getAllProducts);
app.get("/api/products/:id", getProductById);

const PORT = Number(process.env.PORT || 3002);

async function bootstrap() {
  try {
    await MongoSingleton.connect();
    setOrderRepository(new MongoOrderRepository());
    console.log("✅ OrderRepository configurado con MongoDB");
  } catch (err) {
    console.error("❌ MongoDB initialization failed:", err);
    console.error("❌ El sistema requiere MongoDB para funcionar. Verifica la conexión.");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🔥 Cocina escuchando en puerto ${PORT}`);
  });

  startWorker();
}

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("[HTTP ERROR]", err && err.stack ? err.stack : err);
  res.status(err?.status || 500).json({ error: "internal_server_error" });
});

bootstrap().catch((err) => {
  console.error("Fatal bootstrap error:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
});

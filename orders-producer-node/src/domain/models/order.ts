export interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  // Opcional: segundos por unidad desde DB (preparation_times.secondsPerUnit)
  preparationTimeSeconds?: number;
}

export interface OrderMessage {
  id: string;
  customerName: string;
  table: string;       
  items: OrderItem[];
  createdAt: string; 
}

export interface KitchenOrder extends OrderMessage {
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
}

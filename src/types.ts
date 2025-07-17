export enum Role {
  ADMIN = "ADMIN",
  WAITER = "WAITER",
  KITCHEN = "KITCHEN"
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ActiveOrder {
  tableNumber: number;
  items: OrderItem[];
  totalPrice: number;
  createdAt: number; // We'll use a timestamp (e.g., Date.now())
}
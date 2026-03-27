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
  id: string;
  tableId: number;
  table?: {
    id: number;
    number: number;
  };
  items: OrderItem[];
  totalPrice: number;
  createdAt: number; 
}

export enum TableStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  NEEDS_ATTENTION = "NEEDS_ATTENTION"
}

export interface Table {
  id: number;
  number: number;
  capacity: number;
  status: TableStatus;
}

export interface DashboardStats {
  totalRevenue: number;
  totalMenuItems: number;
  totalOrders: number;
  totalCustomers: number;
}

export interface RevenueData {
  name: string;
  revenue: number;
}

export interface TrendingItem {
  id: number;
  name: string;
  price: number;
  category: string;
  sales: number;
  revenue: number;
  image: string;

}
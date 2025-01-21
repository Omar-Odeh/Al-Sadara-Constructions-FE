import { User } from "@/models/user";

export enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  ARRIVED = "ARRIVED",
}

export interface OrderProductRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  products: OrderProductRequest[];
}

export interface Order {
  orderId: number;
  status: OrderStatus;
  user: User;
  products: ProductResponseDTO[];
}

export interface ProductResponseDTO {
  productId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

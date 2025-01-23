import { User } from "@/models/user";
import { Product } from "./product";

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

export interface ProductResponseDTO extends Omit<Product, "id"> {
  productId: number;
  quantity: number;
}

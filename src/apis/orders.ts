import axios, { AxiosRequestConfig } from "axios";
import { Order, OrderRequest, OrderStatus } from "@/models/order";
import { PaginatedResponse } from "@/models/paginated-response";
import { basicAuth } from "@/services/basic-auth";

const BASE_URL = "http://localhost:8080/api/orders";

export function getAllOrders(config?: AxiosRequestConfig) {
  return axios.get<PaginatedResponse<Order>>(`${BASE_URL}/all`, {
    ...config,
    headers: { ...config?.headers, ...basicAuth() },
  });
}

export function getUserOrders(config?: AxiosRequestConfig) {
  return axios.get<PaginatedResponse<Order>>(`${BASE_URL}`, {
    ...config,
    headers: { ...config?.headers, ...basicAuth() },
  });
}

export function placeOrder(payload: OrderRequest, config?: AxiosRequestConfig) {
  return axios.post(`${BASE_URL}`, payload, {
    ...config,
    headers: { ...config?.headers, ...basicAuth() },
  });
}

export function updateOrderStatus(
  orderId: number,
  status: OrderStatus,
  config?: AxiosRequestConfig
) {
  return axios.patch(`${BASE_URL}/${orderId}/status`, {
    ...config,
    headers: { ...config?.headers, ...basicAuth() },
    params: { ...config?.params, status },
  });
}

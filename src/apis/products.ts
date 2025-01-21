import axios, { AxiosRequestConfig } from "axios";
import { Product } from "@/models/product";
import { PaginatedResponse } from "@/models/paginated-response";
import { basicAuth } from "@/services/basic-auth";

const BASE_URL = "http://localhost:8080/api/products";

export function getAllProducts(config?: AxiosRequestConfig) {
  return axios.get<PaginatedResponse<Product>>(`${BASE_URL}`, {
    ...config,
    headers: { ...config?.headers, ...basicAuth() },
  });
}

export function getProduct(productId: number, config?: AxiosRequestConfig) {
  return axios.get<Product>(`${BASE_URL}/${productId}`, {
    ...config,
    headers: { ...config?.headers, ...basicAuth() },
  });
}

export function updateProduct(
  { id: productId, ...payload }: Product,
  config?: AxiosRequestConfig
) {
  return axios.put<Product>(`${BASE_URL}/${productId}`, payload, {
    ...config,
    headers: { ...config?.headers, ...basicAuth() },
  });
}

export function addProduct(
  payload: Omit<Product, "id">,
  config?: AxiosRequestConfig
) {
  return axios.post(`${BASE_URL}`, payload, {
    ...config,
    headers: { ...config?.headers, ...basicAuth() },
  });
}

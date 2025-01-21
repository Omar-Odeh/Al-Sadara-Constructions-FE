import { User } from "@/models/user";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export interface LoginDetails {
  email: string;
  password: string;
}

export interface SignupDetails extends LoginDetails {
  username: string;
  phone: string;
  address: string;
}

export function signup(
  payload: Partial<SignupDetails>,
  config?: AxiosRequestConfig
) {
  return axios.post<User>(`${BASE_URL}/signup`, payload, config);
}

export function login(
  payload: Partial<LoginDetails>,
  config?: AxiosRequestConfig
) {
  return axios.post<User>(`${BASE_URL}/login`, payload, config);
}

export function confirm(config?: AxiosRequestConfig) {
  return axios.get<User>(`${BASE_URL}/confirm`, config);
}

export function resendCode(config?: AxiosRequestConfig) {
  return axios.post<User>(`${BASE_URL}/resend-code`, {}, config);
}

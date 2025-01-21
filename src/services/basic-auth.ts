import { getFromLocalStorage } from "@/utils/local-storage";

export const basicAuth = () => {
  const email = getFromLocalStorage("user")?.email;
  const password = getFromLocalStorage("pass");
  const token = btoa(`${email}:${password}`);
  return email && password
    ? {
        Authorization: `Basic ${token}`,
      }
    : {};
};

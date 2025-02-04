export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  username: string;
  userName?: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  confirmed: boolean;
  roles: UserRole[];
}

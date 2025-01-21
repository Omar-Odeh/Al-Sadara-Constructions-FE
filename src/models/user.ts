export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  username: string;
  password: string;
  email: string;
  address: string;
  confirmed: boolean;
  roles: UserRole[];
}

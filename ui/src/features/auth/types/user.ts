export enum UserType {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: string;
  email: string;
  role: UserType;
}

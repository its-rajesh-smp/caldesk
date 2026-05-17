export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  DOCTOR = "doctor",
  CLINIC = "clinic",
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

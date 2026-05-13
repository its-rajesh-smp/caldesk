export enum UserType {
  ADMIN = "admin",
  DOCTOR = "doctor",
  USER = "user",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserType;
}

import { api } from "@/services/api";
import type { User } from "../types/user";

export const getCurrentUser = (): Promise<User> => {
  return api.get("/me");
};

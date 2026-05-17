import { api } from "@/services/api";
import type { User } from "../types/user";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  token: string;
  user: User;
}

export const registerUser = async (
  payload: RegisterUserInput,
): Promise<RegisterResponse> => {
  return api.post("/auth/register", payload);
};

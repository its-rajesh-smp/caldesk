import axios from "axios";
import type { User } from "../types/user";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  joinAsDoctor?: boolean;
}

interface RegisterResponse {
  token: string;
  user: User;
}

export const registerUser = async (
  payload: RegisterUserInput,
): Promise<RegisterResponse> => {
  return axios.post("/auth/register", payload);
};

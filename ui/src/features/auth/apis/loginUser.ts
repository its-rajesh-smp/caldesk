import axios from "axios";
import type { User } from "../types/user";

interface LoginUserInput {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const loginUser = async (
  payload: LoginUserInput,
): Promise<LoginResponse> => {
  return axios.post("/auth/login", payload);
};

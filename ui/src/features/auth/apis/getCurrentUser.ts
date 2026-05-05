import axios from "axios";
import type { User } from "../types/user";

export const getCurrentUser = (): Promise<User> => {
  return axios.get("/me");
};

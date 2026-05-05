import axios from "axios";

export const registerUser = async (payload: any) => {
  return axios.post("/auth/register", payload);
};

import { env } from "@config/env";
import jwt from "jsonwebtoken";

export const createJwtToken = (payload: object) => {
  return jwt.sign(payload, env.JWT_SECRET);
};

export const verifyJwtToken = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

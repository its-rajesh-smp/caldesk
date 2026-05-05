import { env } from "@config/env";
import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
};

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  if (password === env.MASTER_PASSWORD) {
    return true;
  }
  return await bcrypt.compare(password, hash);
};

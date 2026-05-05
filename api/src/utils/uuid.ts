import { env } from "@config/env";
import uuid from "uuid";

export const createStaticUUID = (key: string) => {
  return uuid.v5(key, env.UUID_NAMESPACE);
};

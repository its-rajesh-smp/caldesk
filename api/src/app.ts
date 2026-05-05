import express from "express";
import { setupMiddleware } from "./middlewares";
import { setupRoutes } from "./routes";
import { runDBMigrations } from "./db";

export const createExpressApp = async () => {
  const app = express();

  await runDBMigrations();
  setupMiddleware(app);
  setupRoutes(app);

  return app;
};

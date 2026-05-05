import express from "express";
import { verifyUser } from "../../middlewares/auth";
import { authRouter } from "./auth";

import { meRouter } from "./me";
import { healthCheck } from "./healthCheck";

export const v1Router = express.Router();

v1Router.get("/health", healthCheck);
v1Router.use("/auth", authRouter);
v1Router.use("/me", verifyUser, meRouter);

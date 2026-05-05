import express from "express";
import { getCurrentUser } from "./getCurrentUser";

export const meRouter = express.Router();

meRouter.get("/", getCurrentUser);

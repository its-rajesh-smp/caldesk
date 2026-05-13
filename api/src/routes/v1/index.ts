import express from "express";
import { verifyAdmin, verifyDoctor, verifyUser } from "../../middlewares/auth";
import { authRouter } from "./auth";

import { adminRouter } from "./admin";
import { appointmentRouter } from "./appointment";
import { healthCheck } from "./healthCheck";
import { meRouter } from "./me";
import { doctorRouter } from "./doctor";

export const v1Router = express.Router();

v1Router.get("/health", healthCheck);
v1Router.use("/auth", authRouter);
v1Router.use("/me", verifyUser, meRouter);
v1Router.use("/doctor", verifyUser, verifyDoctor, doctorRouter);
v1Router.use("/admin", verifyUser, verifyAdmin, adminRouter);
v1Router.use("/appointments", appointmentRouter);

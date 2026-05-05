import express from "express";
import { getAppointments } from "./getAppointments";
import { getAppointmentSlots } from "./getAppointmentSlots";

export const appointmentRouter = express.Router();

appointmentRouter.get("/", getAppointments);
appointmentRouter.get("/:appointmentId/slots", getAppointmentSlots);

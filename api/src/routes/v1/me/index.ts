import express from "express";
import { getCurrentUser } from "./getCurrentUser";
import { bookAnAppointment } from "./bookAnAppointment";
import { getMyAppointments } from "./getMyAppointments";

export const meRouter = express.Router();

meRouter.get("/", getCurrentUser);
meRouter.get("/appointments", getMyAppointments);
meRouter.post("/appointments/:appointmentId/slots/:slotId", bookAnAppointment);

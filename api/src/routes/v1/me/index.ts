import express from "express";
import { getCurrentUser } from "./getCurrentUser";
import { bookAnAppointment } from "./bookAnAppointment";

export const meRouter = express.Router();

meRouter.get("/", getCurrentUser);
meRouter.post("/appointments/:appointmentId/slots/:slotId", bookAnAppointment);

import { validate } from "@middlewares/zod";
import { createAppointmentSchema } from "@validators/appointment/createAppointment";
import { createAppointmentSlotSchema } from "@validators/appointmentSlot/createAppointmentSlot";
import express from "express";
import { createAppointment } from "./createAppointment";
import { createAppointmentSlot } from "./createAppointmentSlot";

export const adminRouter = express.Router();

adminRouter.post(
  "/appointments",
  validate(createAppointmentSchema),
  createAppointment,
);

adminRouter.post(
  "/appointments/:appointmentId/slots",
  validate(createAppointmentSlotSchema),
  createAppointmentSlot,
);

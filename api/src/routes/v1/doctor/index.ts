import { validate } from "@middlewares/zod";
import { createDoctorAppointmentSchema } from "@validators/appointmentSlot/createAppointmentSlot";
import express from "express";
import { createDoctorAppointment } from "./createAppointment";

export const doctorRouter = express.Router();

doctorRouter.post(
  "/appointments",
  validate(createDoctorAppointmentSchema),
  createDoctorAppointment,
);

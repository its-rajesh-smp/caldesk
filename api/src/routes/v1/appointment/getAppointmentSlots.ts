import { AppointmentSlot } from "@models/AppointmentSlot";
import { Request, Response } from "express";

export const getAppointmentSlots = async (
  req: Request<{ appointmentId: string }>,
  res: Response,
) => {
  const { appointmentId } = req.params;
  const slots = await AppointmentSlot.findByAppointmentId(appointmentId);
  return res.success(slots);
};

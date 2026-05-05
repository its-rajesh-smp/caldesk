import { AppointmentSlot } from "@models/AppointmentSlot";
import { CreateAppointmentSlotInput } from "@validators/appointmentSlot/createAppointmentSlot";
import { Request, Response } from "express";

export const createAppointmentSlot = async (
  req: Request<{ appointmentId: string }, any, CreateAppointmentSlotInput>,
  res: Response,
) => {
  const { appointmentId } = req.params;
  const { url, startAt, endAt } = req.body;

  const appointmentSlot = await AppointmentSlot.create({
    appointmentId,
    url,
    startAt,
    endAt,
  });

  return res.success(appointmentSlot);
};

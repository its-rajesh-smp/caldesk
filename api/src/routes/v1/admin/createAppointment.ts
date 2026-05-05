import { Appointment } from "@models/Appointment";
import { CreateAppointmentInput } from "@validators/appointment/createAppointment";
import { Request, Response } from "express";
import { AppointmentStatus } from "../../../types/appointments";

export const createAppointment = async (
  req: Request<any, any, CreateAppointmentInput>,
  res: Response,
) => {
  const { id: ownerId } = req.user;
  const { name, description } = req.body;

  const appointment = await Appointment.create({
    ownerId,
    name,
    description,
    status: AppointmentStatus.ACTIVE,
  });

  return res.success(appointment);
};

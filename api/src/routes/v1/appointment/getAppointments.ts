import { Appointment } from "@models/Appointment";
import { Request, Response } from "express";

export const getAppointments = async (_req: Request, res: Response) => {
  const appointments = await Appointment.findActiveAppointments();
  return res.success(appointments);
};

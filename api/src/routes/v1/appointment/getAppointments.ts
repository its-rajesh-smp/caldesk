import { Appointment } from "@models/Appointment";
import { Request, Response } from "express";

export const getAppointments = async (_req: Request, res: Response) => {
  const appointments = await Appointment.findActiveDoctorAppointments();
  return res.success(appointments);
};

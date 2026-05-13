import { Appointment } from "@models/Appointment";
import { CreateDoctorAppointmentInput } from "@validators/appointmentSlot/createAppointmentSlot";
import { Request, Response } from "express";
import { AppointmentStatus } from "../../../types/appointments";

export const createDoctorAppointment = async (
  req: Request<any, any, CreateDoctorAppointmentInput>,
  res: Response,
) => {
  const { id: ownerId } = req.user;
  const { name, description, url, slots } = req.body;

  const appointment = await Appointment.createWithSlots({
    appointmentData: {
      ownerId,
      name,
      description,
      status: AppointmentStatus.ACTIVE,
    },
    slots: slots.map((slot) => ({
      ...slot,
      url,
    })),
  });

  return res.success(appointment, "Consultation slots created successfully");
};

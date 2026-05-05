import { AppointmentSlot } from "@models/AppointmentSlot";
import { UserAppointment } from "@models/UserAppointment";
import { Request, Response } from "express";

export const bookAnAppointment = async (
  req: Request<{ slotId: string; appointmentId: string }>,
  res: Response,
) => {
  const { slotId, appointmentId } = req.params;
  const { id: userId } = req.user;

  if (!slotId) {
    return res.error("Invalid request", 400);
  }

  // if slot is already booked then throw error
  const isSlotBooked = await AppointmentSlot.checkAvailability(slotId);

  if (isSlotBooked) {
    return res.error("Oops! Slot is already booked", 400);
  }

  //   TODO: Check if the slot is still in the time range
  const slot = await AppointmentSlot.findById(slotId);

  const userAppointment = await UserAppointment.create({
    appointmentSlotId: slotId,
    userId,
    appointmentId,
  });

  return res.success(userAppointment, "Appointment booked successfully");
};

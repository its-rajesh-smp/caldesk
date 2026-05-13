import { UserAppointment } from "@models/UserAppointment";
import { Request, Response } from "express";

export const getMyAppointments = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const appointments = await UserAppointment.findByUserIdWithDetails(userId!);

  return res.success(
    appointments.map((appointment: any) => ({
      id: appointment.id,
      appointmentId: appointment.appointmentId,
      appointmentSlotId: appointment.appointmentSlotId,
      bookedAt: appointment.createdAt,
      consultation: {
        name: appointment.appointmentName,
        description: appointment.appointmentDescription,
      },
      doctor: {
        id: appointment.doctorId,
        name: appointment.doctorName,
        email: appointment.doctorEmail,
      },
      slot: {
        url: appointment.slotUrl,
        startAt: appointment.slotStartAt,
        endAt: appointment.slotEndAt,
      },
    })),
  );
};

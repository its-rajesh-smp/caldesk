import z from "zod";

export const createAppointmentSlotSchema = z.object({
  url: z.url().trim(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
});

const appointmentSlotSchema = z
  .object({
    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
  })
  .refine((value) => value.endAt > value.startAt, {
    message: "Slot end time must be after start time",
    path: ["endAt"],
  });

export const createDoctorAppointmentSchema = z.object({
  name: z.string().trim().min(5, "Name must be at least 5 characters long"),
  description: z.string().trim().optional(),
  url: z.url().trim(),
  slots: z.array(appointmentSlotSchema).min(1, "Add at least one slot"),
});

export type CreateAppointmentSlotInput = z.infer<
  typeof createAppointmentSlotSchema
>;

export type CreateDoctorAppointmentInput = z.infer<
  typeof createDoctorAppointmentSchema
>;

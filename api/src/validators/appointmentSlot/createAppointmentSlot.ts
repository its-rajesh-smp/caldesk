import z from "zod";

export const createAppointmentSlotSchema = z.object({
  url: z.url().trim(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
});

export type CreateAppointmentSlotInput = z.infer<
  typeof createAppointmentSlotSchema
>;

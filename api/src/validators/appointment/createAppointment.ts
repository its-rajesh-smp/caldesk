import z from "zod";

export const createAppointmentSchema = z.object({
  name: z.string().trim().min(5, "Name must be at least 5 characters long"),
  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters long")
    .optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

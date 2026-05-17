import z from "zod";

export const registerUserSchema = z.object({
  name: z.string().trim().min(5, "Name must be at least 5 characters long"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

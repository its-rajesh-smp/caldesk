import z from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long"),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    joinAsDoctor: z.boolean().optional().default(false),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match with confirm password",
      });
    }
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

import { User } from "@models/User";
import { verifyPassword } from "@utils/bcrypt";
import { createJwtToken } from "@utils/jwt";
import { LoginUserInput } from "@validators/auth/login";
import { Request, Response } from "express";

export const login = async (
  req: Request<any, any, LoginUserInput>,
  res: Response,
) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (!user) {
    return res.error("User not exists", 404);
  }

  await verifyPassword(password, user.password!);

  const token = createJwtToken({ id: user.id, email: user.email });

  return res.success({ token, user });
};

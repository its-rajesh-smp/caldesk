import { User } from "@models/User";
import { hashPassword } from "@utils/bcrypt";
import { createJwtToken } from "@utils/jwt";
import { RegisterUserInput } from "@validators/auth/register";
import { Request, Response } from "express";

export const register = async (
  req: Request<any, any, RegisterUserInput>,
  res: Response,
) => {
  console.log("Registering user with data:", req.body);

  const { email, password, name } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await User.create({ email, password: hashedPassword, name });

  const jwtToken = createJwtToken({ email, id: user.id, name });

  return res.success({ token: jwtToken, user });
};

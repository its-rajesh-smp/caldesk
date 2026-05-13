import { User } from "@models/User";
import { hashPassword } from "@utils/bcrypt";
import { createJwtToken } from "@utils/jwt";
import { RegisterUserInput } from "@validators/auth/register";
import { Request, Response } from "express";
import { UserType } from "../../../types/users";

export const register = async (
  req: Request<any, any, RegisterUserInput>,
  res: Response,
) => {
  console.log("Registering user with data:", req.body);

  const { name, email, password, joinAsDoctor } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    name,
    password: hashedPassword,
    role: joinAsDoctor ? UserType.DOCTOR : UserType.USER,
  });

  const jwtToken = createJwtToken({ email, id: user.id });

  return res.success({ token: jwtToken, user });
};

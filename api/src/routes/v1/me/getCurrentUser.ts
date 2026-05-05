import { User } from "@models/User";
import { Request, Response } from "express";

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user.id!);
  return res.success(user);
};

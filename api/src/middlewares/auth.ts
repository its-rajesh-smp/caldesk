import { User } from "@models/User";
import { verifyJwtToken } from "@utils/jwt";

import { NextFunction, Request, Response } from "express";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.error("Unauthorized", 401);
  }

  let jwtPayload: any;

  try {
    jwtPayload = verifyJwtToken(token);
  } catch (error) {
    return res.error("Unauthorized", 401);
  }

  const user: Partial<User> = {
    id: jwtPayload.id,
    email: jwtPayload.email,
  };

  req.user = user;

  next();
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.error("Unauthorized", 401);
  }

  const user = await User.findById(req.user.id!);

  if (user.role !== "admin") {
    return res.error("Unauthorized", 401);
  }

  next();
};

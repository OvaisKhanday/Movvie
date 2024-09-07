import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function authenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    req.body.tokenData = jwt.verify(
      req.cookies?.token,
      process.env.TOKEN_SECRET!
    );

    next();
  } catch (error) {
    return res.status(401).json({ message: "user not authenticated" });
  }
}

export const authMiddleware = { authenticateUser };

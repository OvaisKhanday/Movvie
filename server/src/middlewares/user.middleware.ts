import { NextFunction, Request, Response } from "express";

function validateSignupDetails(req: Request, res: Response, next: NextFunction) {
  const {
    username,
    email,
    password,
    name,
    age,
  }: {
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    age?: any;
  } = req.body;

  if (!username || !email || !password || !name || !age || isNaN(age)) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required",
    });
  }

  req.body.age = Number.parseInt(age);

  next();
}

function validateLoginDetails(req: Request, res: Response, next: NextFunction) {
  const { username, email, password }: { username?: string; email?: string; password?: string } = req.body;

  // check if username or email provided
  if (!(username || email)) {
    return res.status(400).json({
      success: false,
      message: "Username or Email required",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password required",
    });
  }

  next();
}

export const userMiddleware = { validateSignupDetails, validateLoginDetails };

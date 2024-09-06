import prisma from "../db/dbConnect.js";
import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

async function registerUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // taking every data from body
    const {
      username,
      email,
      password,
      name,
      age,
    }: {
      username: string;
      email: string;
      password: string;
      name: string;
      age: number;
    } = request.body;

    // check user already exists or not
    const existedUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existedUser) {
      return response.status(409).json({
        success: false,
        message: "User already exists with this username or email",
      });
    }

    // taking the image through multer
    const image = request.file ? request.file.buffer : null;
    // hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create the user in database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name,
        age,
        picture: image,
      },
      select: {
        username: true,
        email: true,
        age: true,
        name: true,
        id: true,
        picture: true,
      },
    });

    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const imageBase64 = user.picture
      ? Buffer.from(user.picture).toString("base64")
      : null;

    response.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // sending response after user created successfully
    return response.status(201).json({
      success: true,
      message: "Register user successfully",

      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        age: user.age,
        userImage: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : null,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function loginUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // taking the username or email and password from body
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = request.body;

    // check the user exists or not
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (!user) {
      return response.status(404).json({
        success: false,
        message: "User not exists",
      });
    }

    // check password is matching or not
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response.status(401).json({
        success: false,
        message: "Password incorrect",
      });
    }

    // create the access token and store it in cookies
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const imageBase64 = user.picture
      ? Buffer.from(user.picture).toString("base64")
      : null;

    response.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return response.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        userImage: imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : null,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logoutUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    response.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });

    return response.status(200).json({
      success: true,
      message: "Log out successful",
    });
  } catch (error) {
    next(error);
  }
}

export const userController = { registerUser, loginUser, logoutUser };

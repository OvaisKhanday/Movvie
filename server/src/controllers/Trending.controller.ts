import { NextFunction, Request, Response } from "express";
import { getTrending } from "../api/trending.js";

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hello htere");
    const trending = await getTrending();
    console.log("hello htere 2");
    res.status(200).json(trending);
  } catch (error) {
    next();
  }
}

export default { get };

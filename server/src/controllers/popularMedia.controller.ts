import { NextFunction, Request, Response } from "express";
import { getPopularMedia } from "../api/popularMedia.js";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number.parseInt(req.query.page?.toString() ?? "1");
    const trending: IPopularMediaResponse | null = await getPopularMedia(page);
    if (trending == null) throw new Error("media not found");
    res.status(200).json(trending);
  } catch (error) {
    next(error);
  }
}

export default { getAll };

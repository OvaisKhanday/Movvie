import { NextFunction, Request, Response } from "express";

function getThumbnail(req: Request, res: Response, next: NextFunction) {
  try {
    const image_id = req.params.img_id;
    if (image_id == null || image_id.length === 0) throw new Error("invalid image id");
    res.redirect(`https://image.tmdb.org/t/p/w500/${image_id}`);
  } catch (error) {
    next(error);
  }
}

function getHighResImage(req: Request, res: Response, next: NextFunction) {
  try {
    const image_id = req.params.img_id;
    if (image_id == null || image_id.length === 0) throw new Error("invalid image id");
    res.redirect(`https://image.tmdb.org/t/p/w1280/${image_id}`);
  } catch (error) {
    next(error);
  }
}

export const imageController = { getThumbnail, getHighResImage };

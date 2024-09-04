import { Request, Response, NextFunction } from "express";
import { fetchMovieDetails, fetchTVShowDetails } from "../api/index.js";

async function getMovieDetails(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    if (id == null) throw new Error("id not found");
    const movie: IMovieDetails | null = await fetchMovieDetails(id);
    if (movie == null) return res.status(404).send("media not found");
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}

async function getTVShowDetails(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    if (id == null) throw new Error("id not found");
    const tvShow: ITVShowDetails | null = await fetchTVShowDetails(id);
    if (tvShow == null) return res.status(404).send("media not found");
    res.status(200).json(tvShow);
  } catch (error) {
    next(error);
  }
}

export const mediaDetailsController = { getMovieDetails, getTVShowDetails };

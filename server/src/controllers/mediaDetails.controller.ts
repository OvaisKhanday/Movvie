import { Request, Response, NextFunction } from "express";
import { fetchMovieDetails, fetchTVShowDetails } from "../api/mediaDetails.js";

async function getMovieDetails(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id == null) throw new Error("id not found");
    const id = Number.parseInt(req.params.id);
    const movie: IMovieDetails | null = await fetchMovieDetails(id);
    if (movie == null) throw new Error("movie not found");
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}

async function getTVShowDetails(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.params.id == null) throw new Error("id not found");
    const id = Number.parseInt(req.params.id);
    const tvShow: ITVShowDetails | null = await fetchTVShowDetails(id);
    if (tvShow == null) throw new Error("tv show not found");
    res.status(200).json(tvShow);
  } catch (error) {
    next(error);
  }
}

export { getMovieDetails, getTVShowDetails };

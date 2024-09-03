import { NextFunction, Request, Response } from "express";
import { getPopularMedia, getPopularMovies, getPopularTVShows } from "../api/popularMedia.js";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number.parseInt(req.query.page?.toString() ?? "1");
    const popularMedia: IPopularMediaResponse | null = await getPopularMedia(page);
    if (popularMedia == null) throw new Error("media not found");
    res.status(200).json(popularMedia);
  } catch (error) {
    next(error);
  }
}

async function getMovies(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number.parseInt(req.query.page?.toString() ?? "1");
    const popularMovies: IPopularMoviesResponse | null = await getPopularMovies(page);
    if (popularMovies == null) throw new Error("movies not found");
    res.status(200).json(popularMovies);
  } catch (error) {
    next(error);
  }
}
async function getTVShows(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number.parseInt(req.query.page?.toString() ?? "1");
    const popularTVShows: IPopularTVShowsResponse | null = await getPopularTVShows(page);
    if (popularTVShows == null) throw new Error("movies not found");
    res.status(200).json(popularTVShows);
  } catch (error) {
    next(error);
  }
}
export default { getAll, getMovies, getTVShows };

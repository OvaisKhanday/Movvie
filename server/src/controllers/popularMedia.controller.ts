import { NextFunction, Request, Response } from "express";
import { getPopularMedia, getPopularMovies, getPopularTVShows } from "../api/index";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedNum = Number.parseInt(req.query.page?.toString() ?? "1");
    const page = isNaN(parsedNum) ? 1 : parsedNum;
    const popularMedia: IPopularMediaResponse | null = await getPopularMedia(page);
    if (popularMedia == null) return res.status(404).send("media not found");
    res.status(200).json(popularMedia);
  } catch (error) {
    next(error);
  }
}

async function getMovies(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedNum = Number.parseInt(req.query.page?.toString() ?? "1");
    const page = isNaN(parsedNum) ? 1 : parsedNum;
    const popularMovies: IPopularMoviesResponse | null = await getPopularMovies(page);
    if (popularMovies == null) return res.status(404).send("media not found");
    res.status(200).json(popularMovies);
  } catch (error) {
    next(error);
  }
}
async function getTVShows(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedNum = Number.parseInt(req.query.page?.toString() ?? "1");
    const page = isNaN(parsedNum) ? 1 : parsedNum;
    const popularTVShows: IPopularTVShowsResponse | null = await getPopularTVShows(page);
    if (popularTVShows == null) return res.status(404).send("media not found");
    res.status(200).json(popularTVShows);
  } catch (error) {
    next(error);
  }
}
export const popularMediaController = { getAll, getMovies, getTVShows };

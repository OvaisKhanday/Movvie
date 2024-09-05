import { NextFunction, Request, Response } from "express";
import { getTrending } from "../api/index.js";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedNum = Number.parseInt(req.query.page?.toString() ?? "1");
    const page = isNaN(parsedNum) ? 1 : parsedNum;
    const trending: ITrendingResponse | null = await getTrending(page);
    if (trending == null) return res.status(404).send("media not found");
    const response: (IMovie | ITVShow)[] = trending.results.map((result) => {
      if (result.media_type === "movie") {
        const newMovie: IMovie = {
          media_type: result.media_type,
          release_date: result.release_date,
          id: result.id,
          backdrop_path: result.backdrop_path,
          adult: result.adult,
          poster_path: result.poster_path,
          title: result.title,
        };
        return newMovie;
      } else {
        const newTVShow: ITVShow = {
          id: result.id,
          adult: result.adult,
          backdrop_path: result.backdrop_path,
          first_air_date: result.first_air_date,
          media_type: result.media_type,
          poster_path: result.poster_path,
          name: result.name,
        };
        return newTVShow;
      }
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export const trendingController = { getAll };

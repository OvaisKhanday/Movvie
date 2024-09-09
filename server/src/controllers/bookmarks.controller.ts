import { NextFunction, Request, Response } from "express";
import { fetchMovieDetails, fetchTVShowDetails } from "../api/index";
import prisma from "../db/dbConnect";
const LIMIT = 20;
async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number.parseInt(`${req.query.page}`);
    const { id: userId }: { id: number } = req.body.tokenData;

    const totalResults = await prisma.bookmark.count({ where: { userId } });
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      skip: (page - 1) * LIMIT,
      take: LIMIT,
    });
    res.status(200).json({
      page,
      results: bookmarks,
      total_results: totalResults,
      total_pages: Math.ceil(totalResults / LIMIT),
    });
  } catch (error) {
    next(error);
  }
}

async function addBookmark(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: bookmarkId, type: mediaType }: { id: number; type: "MOVIE" | "TV" } = req.body;
    const { id: userId } = req.body.tokenData;

    const presentBookmark = await prisma.bookmark.findFirst({ where: { AND: [{ id: bookmarkId }, { userId }] } });

    if (presentBookmark) {
      return res.status(409).json(presentBookmark);
    }

    let media: IBookmark | null = null;
    if (mediaType.toUpperCase() == "MOVIE") {
      const movie = await fetchMovieDetails(bookmarkId.toString());
      if (movie) {
        media = {
          id: movie.id,
          adult: movie.adult,
          backdropPath: movie.backdrop_path,
          mediaType: "MOVIE",
          posterPath: movie.poster_path,
          startDate: new Date(movie.release_date),
          title: movie.title,
        };
      }
    } else {
      const tvShow = await fetchTVShowDetails(bookmarkId.toString());
      if (tvShow) {
        media = {
          id: tvShow.id,
          adult: tvShow.adult,
          backdropPath: tvShow.backdrop_path,
          mediaType: "TV",
          posterPath: tvShow.poster_path,
          startDate: new Date(tvShow.first_air_date),
          title: tvShow.name,
        };
      }
    }

    if (!media) {
      return res.status(404).json({ message: "no resource found" });
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        ...media,
        userId,
      },
    });
    media.createdAt = bookmark.createdAt;

    res.status(201).json(media);
  } catch (error) {
    next(error);
  }
}

async function deleteBookmark(req: Request, res: Response, next: NextFunction) {
  try {
    const bookmarkId = Number.parseInt(`${req.query.id}`);
    const { id: userId }: { id: number } = req.body.tokenData;

    const presentBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_id: {
          userId,
          id: bookmarkId,
        },
      },
    });
    if (!presentBookmark) return res.status(404).end();

    const deletedItem = await prisma.bookmark.delete({
      where: {
        userId_id: {
          userId,
          id: bookmarkId,
        },
      },
    });

    res.status(200).json(deletedItem);
  } catch (error) {
    next(error);
  }
}

async function getBookmark(req: Request, res: Response, next: NextFunction) {
  try {
    const bookmarkId: number = Number.parseInt(`${req.query.id}`);
    const { id: userId }: { id: number } = req.body.tokenData;

    const bookmark = await prisma.bookmark.findFirst({ where: { AND: [{ userId }, { id: bookmarkId }] } });
    if (!bookmark) return res.status(404).send("Media not found");

    const bookmarkDetails =
      bookmark.mediaType === "MOVIE"
        ? await fetchMovieDetails(`${bookmarkId}`)
        : await fetchTVShowDetails(`${bookmarkId}`);

    if (!bookmarkDetails) return res.status(404).end();

    return res.status(200).json(bookmarkDetails);
  } catch (error) {
    next(error);
  }
}

export const bookmarksController = { getAll, addBookmark, deleteBookmark, getBookmark };

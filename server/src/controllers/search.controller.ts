import { NextFunction, Request, Response } from "express";
import { getSearched } from "../api/index.js";

async function getSearchedAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number.parseInt(req.query.page?.toString() ?? "1");
    const query = req.query.query?.toString() ?? "";
    const searchedItems: ISearchMedia | null = await getSearched(page, query);
    if (searchedItems == null) return res.status(404).send("media not found");
    res.status(200).json(searchedItems);
  } catch (error) {
    next(error);
  }
}

export const searchController = { getSearchedAll };

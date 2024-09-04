import { NextFunction, Request, Response } from "express";

function get(req: Request, res: Response, next: NextFunction) {
  res.status(200).send("Welcome to Movvie");
}

export const appController = {
  get,
};

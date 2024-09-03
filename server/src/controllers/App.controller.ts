import { Request, Response } from "express";

function get(req: Request, res: Response) {
  res.status(200).send("Welcome to Movvie");
}

export default { get };

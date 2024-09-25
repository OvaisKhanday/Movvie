import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes/index";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParse());

routes.forEach((r) => app.use(r.route, r.router));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send(`"Internal Server Error" : ${err.message}`);
});

const PORT = process.env.PORT;

const server = app.listen(PORT || 8080, () => {
  console.log(`app is listening: http://localhost:${PORT}`);
});

export { app, server };

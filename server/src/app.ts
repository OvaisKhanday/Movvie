import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes/index.js";

const app = express();
app.use(express.json());

routes.forEach((r) => app.use(r.route, r.router));

app.get("/", (req, res) => {
  res.send("Setup Node with TS and JEST with Nodemon watching");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(8080, () => {
  console.log("app is listening: http://localhost:8080");
});

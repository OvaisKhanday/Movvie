import { Application, Router } from "express";
import appRouter from "./App.router.js";
import trendingRouter from "./Trending.router.js";

export const routes: { route: string; router: Router }[] = [
  { route: "/", router: appRouter },
  { route: "/trending", router: trendingRouter },
];

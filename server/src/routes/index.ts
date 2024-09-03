import { Router } from "express";
import { appRouter } from "./App.router.js";
import { trendingRouter } from "./Trending.router.js";
import { popularMediaRouter } from "./PopularMedia.router.js";
import { mediaDetailsRouter } from "./mediaDetails.router.js";
import { imagesRouter } from "./images.js";

export const routes: { route: string; router: Router }[] = [
  { route: "/", router: appRouter },
  { route: "/trending", router: trendingRouter },
  { route: "/popular", router: popularMediaRouter },
  { route: "/details", router: mediaDetailsRouter },
  { route: "/image", router: imagesRouter },
];

import { Router } from "express";
import { appRouter } from "./app.router.js";
import { trendingRouter } from "./trending.router.js";
import { popularMediaRouter } from "./popularMedia.router.js";
import { mediaDetailsRouter } from "./mediaDetails.router.js";
import { imagesRouter } from "./images.router.js";
import { searchRouter } from "./search.router.js";

export const routes: { route: string; router: Router }[] = [
  { route: "/", router: appRouter },
  { route: "/trending", router: trendingRouter },
  { route: "/popular", router: popularMediaRouter },
  { route: "/details", router: mediaDetailsRouter },
  { route: "/image", router: imagesRouter },
  { route: "/search", router: searchRouter },
];

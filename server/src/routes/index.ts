import { Router } from "express";
import { appRouter } from "./app.router";
import { trendingRouter } from "./trending.router";
import { popularMediaRouter } from "./popularMedia.router";
import { mediaDetailsRouter } from "./mediaDetails.router";
import { imagesRouter } from "./images.router";
import { searchRouter } from "./search.router";
import { userRouter } from "./user.router";
import { bookmarksRouter } from "./bookmarks.route";

export const routes: { route: string; router: Router }[] = [
  { route: "/", router: appRouter },
  { route: "/trending", router: trendingRouter },
  { route: "/popular", router: popularMediaRouter },
  { route: "/details", router: mediaDetailsRouter },
  { route: "/image", router: imagesRouter },
  { route: "/search", router: searchRouter },
  { route: "/auth", router: userRouter },
  { route: "/bookmark", router: bookmarksRouter },
];

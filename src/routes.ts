import { Router } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { HomeRoutes } from "./app/modules/home/home.route";
import { HighlightsRoutes } from "./app/modules/highlights/highlights.route";
import { AboutRoutes } from "./app/modules/about/about.route";
import { GalleryRoutes } from "./app/modules/gallery/gallery.route";

const appRouter = Router();

const moduleRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/home", route: HomeRoutes },
  { path: "/about", route: AboutRoutes },
  { path: "/highlights", route: HighlightsRoutes },
  { path: "/gallery", route: GalleryRoutes },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
export default appRouter;

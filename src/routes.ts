import { Router } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { HomeRoutes } from "./app/modules/home/home.route";
import { HighlightsRoutes } from "./app/modules/highlights/highlights.route";
import { AboutRoutes } from "./app/modules/about/about.route";
import { GalleryRoutes } from "./app/modules/gallery/gallery.route";
import { ContactRoutes } from "./app/modules/contact/contact.route";
import { FooterRoutes } from "./app/modules/footer/footer.route";
import { ScheduleRoutes } from "./app/modules/schedule/schedule.route";

const appRouter = Router();

const moduleRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/home", route: HomeRoutes },
  { path: "/about", route: AboutRoutes },
  { path: "/highlights", route: HighlightsRoutes },
  { path: "/gallery", route: GalleryRoutes },
  { path: "/contact", route: ContactRoutes },
  { path: "/schedule", route: ScheduleRoutes },
  { path: "/footer", route: FooterRoutes },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
export default appRouter;

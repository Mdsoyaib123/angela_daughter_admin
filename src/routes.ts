import { Router } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { HomeRoutes } from "./app/modules/home/home.route";

const appRouter = Router();

const moduleRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/home", route: HomeRoutes },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
export default appRouter;

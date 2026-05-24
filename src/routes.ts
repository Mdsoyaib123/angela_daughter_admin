import { Router } from "express";
import { UserRoutes } from "./app/modules/user/user.route";

const appRouter = Router();

const moduleRoutes = [
  { path: "/user", route: UserRoutes },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
export default appRouter;

import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/create-user", UserControllers.createUser);
router.get("/getAll", UserControllers.getAllUsers);
router.get("/getSingle/:id", UserControllers.getSingleUser);

export const UserRoutes = router;
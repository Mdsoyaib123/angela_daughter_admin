// home.route.ts

import express from "express";
import { HomeControllers } from "./home.controller";
import { HomeValidation } from "./home.validation";
import validateRequest from "../../utils/validateRequest";
import { upload } from "../../middlewares/upload";

const router = express.Router();

router.post(
  "/create",

  upload.fields([
    { name: "frist_img", maxCount: 1 },
    { name: "second_img", maxCount: 1 },
  ]),

//   validateRequest(HomeValidation.createHomeValidationSchema),

  HomeControllers.createHome
);

router.get("/", HomeControllers.getHome);

router.patch(
  "/update/:id",

  upload.fields([
    { name: "frist_img", maxCount: 1 },
    { name: "second_img", maxCount: 1 },
  ]),

//   validateRequest(HomeValidation.updateHomeValidationSchema),

  HomeControllers.updateHome
);

router.delete("/delete/:id", HomeControllers.deleteHome);
router.get("/active", HomeControllers.getActiveHome);


export const HomeRoutes = router;
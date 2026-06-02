import express from "express";
import { AboutControllers } from "./about.controller";
import { upload } from "../../middlewares/upload";

const router = express.Router();

router.post(
    "/create",
    upload.fields([
        { name: "bannerImgUrl", maxCount: 1 },
        { name: "earlyBeginningImgUrl", maxCount: 1 },
        { name: "fristVictoryImgUrl", maxCount: 1 },
        { name: "tranningImgUrl", maxCount: 1 },
        { name: "accoladesMilestonesImgUrl", maxCount: 1 },
        { name: "playerReflectionImgUrl", maxCount: 1 },
    ]),
    AboutControllers.createAbout
);

router.get("/getAll", AboutControllers.getAbout);

router.get("/get/active", AboutControllers.getActiveAbout);

router.patch(
    "/update/:id",
    upload.fields([
        { name: "bannerImgUrl", maxCount: 1 },
        { name: "earlyBeginningImgUrl", maxCount: 1 },
        { name: "fristVictoryImgUrl", maxCount: 1 },
        { name: "tranningImgUrl", maxCount: 1 },
        { name: "accoladesMilestonesImgUrl", maxCount: 1 },
        { name: "playerReflectionImgUrl", maxCount: 1 },
    ]),
    AboutControllers.updateAbout
);

router.delete("/delete/:id", AboutControllers.deleteAbout);

export const AboutRoutes = router;
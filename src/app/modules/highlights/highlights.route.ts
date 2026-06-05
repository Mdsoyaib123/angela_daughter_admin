// highlights.route.ts

import express from "express";
import { HighlightsControllers } from "./highlights.controller";
import { upload } from "../../middlewares/upload";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "MainVideo_url", maxCount: 1 },
    { name: "videos", maxCount: 20 },
    { name: "feedVideos", maxCount: 20 },
  ]),
  HighlightsControllers.createHighlights
);

router.get("/getAll", HighlightsControllers.getHighlights);

router.get("/active", HighlightsControllers.getActiveHighlights);

router.patch(
  "/update/:id",
  upload.fields([
    { name: "MainVideo_url", maxCount: 1 },
    { name: "videos", maxCount: 20 },
    { name: "feedVideos", maxCount: 20 },
  ]),
  HighlightsControllers.updateHighlights
);

router.delete("/delete/:id", HighlightsControllers.deleteHighlights);

router.patch(
  "/:highlightsId/videos/:videoId",
  upload.single("video"),
  HighlightsControllers.updateSingleVideo
);

router.delete(
  "/delete/:highlightsId/videos/:videoId",
  HighlightsControllers.deleteSingleVideo
);

router.patch(
  "/:highlightsId/feed-videos/:feedVideoId",
  upload.single("feedVideo"),
  HighlightsControllers.updateSingleFeedVideo
);

router.delete(
  "/delete/:highlightsId/feed-videos/:feedVideoId",
  HighlightsControllers.deleteSingleFeedVideo
);

router.post(
  "/:highlightsId/videos/add",
  upload.single("video"),
  HighlightsControllers.addSingleVideo
);

router.post(
  "/:highlightsId/feed-videos/add",
  upload.single("feedVideo"),
  HighlightsControllers.addSingleFeedVideo
);

export const HighlightsRoutes = router;
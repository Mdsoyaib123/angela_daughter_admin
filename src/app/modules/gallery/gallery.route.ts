import express from "express";
import { GalleryControllers } from "./gallery.controller";
import { upload } from "../../middlewares/upload";

const router = express.Router();

router.post(
    "/create",
    upload.fields([
        { name: "bannerFristImg", maxCount: 1 },
        { name: "bannerSecondImg", maxCount: 1 },
        { name: "mentorshipImgUrl", maxCount: 1 },
        { name: "photos", maxCount: 50 },
    ]),
    GalleryControllers.createGallery
);

router.get("/getAll", GalleryControllers.getGallery);

router.get("/get/active", GalleryControllers.getActiveGallery);

router.patch(
    "/update/:id",
    upload.fields([
        { name: "bannerFristImg", maxCount: 1 },
        { name: "bannerSecondImg", maxCount: 1 },
        { name: "mentorshipImgUrl", maxCount: 1 },
        { name: "photos", maxCount: 50 },
    ]),
    GalleryControllers.updateGallery
);

router.patch(
    "/:galleryId/photos/:photoId",
    upload.single("photo"),
    GalleryControllers.updateSinglePhoto
);

router.delete(
    "/:galleryId/photos/:photoId",
    GalleryControllers.deleteSinglePhoto
);


router.delete("/delete/:id", GalleryControllers.deleteGallery);

export const GalleryRoutes = router;
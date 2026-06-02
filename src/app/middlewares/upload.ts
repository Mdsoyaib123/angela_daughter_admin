// src/middlewares/upload.ts

import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import crypto from "crypto";
import { s3Client } from "../configs/s3.config";

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",

    "video/mp4",
    "video/webm",

    "video/quicktime", // .mov

    "video/x-msvideo",
    "video/x-matroska",
    "application/octet-stream",
];

export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME!,

        contentType: multerS3.AUTO_CONTENT_TYPE,

        contentDisposition: "inline",

        key: (_req, file, cb) => {
            let folder = "uploads";

            if (file.fieldname === "MainVideo_url") {
                folder = "highlights/main-video";
            }

            if (file.fieldname === "videos") {
                folder = "highlights/videos";
            }

            if (file.fieldname === "feedVideos") {
                folder = "highlights/feed-videos";
            }

            if (
                file.fieldname === "bannerImgUrl" ||
                file.fieldname === "earlyBeginningImgUrl" ||
                file.fieldname === "fristVictoryImgUrl" ||
                file.fieldname === "tranningImgUrl" ||
                file.fieldname === "accoladesMilestonesImgUrl" ||
                file.fieldname === "playerReflectionImgUrl"
            ) {
                folder = "about";
            }

            

            const ext = path.extname(file.originalname);
            const fileName = `${folder}/${crypto.randomUUID()}${ext}`;

            cb(null, fileName);
        },
    }),

    fileFilter: (_req, file, cb) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Only image and video files are allowed"));
        }

        cb(null, true);
    },

    limits: {
        fileSize: 500 * 1024 * 1024,
    },
});
// src/middlewares/upload.ts
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { s3Client } from "../configs/s3.config";

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/webm",
    "video/quicktime",
];

export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME!,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (_req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = `uploads/${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
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
        fileSize: 100 * 1024 * 1024, // 100MB
    },
});
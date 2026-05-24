// highlights.service.ts

import { Highlights } from "./highlights.model";
import { deleteFromS3 } from "../../utils/deleteFromS3";

type UploadedFiles = {
    [fieldname: string]: Express.MulterS3.File[];
};

const getValueByIndex = (value: any, index: number, fallback: string) => {
    if (Array.isArray(value)) {
        return value[index] || fallback;
    }

    return value || fallback;
};

const createHighlights = async (payload: any, files: any) => {
    const uploadedFiles = files as UploadedFiles;

    const mainVideo = uploadedFiles?.MainVideo_url?.[0];

    if (!mainVideo?.location) {
        throw new Error("Main video is required");
    }

    const videos =
        uploadedFiles?.videos?.map((file, index) => ({
            video_url: file.location,
            video_name: getValueByIndex(
                payload.video_name,
                index,
                file.originalname
            ),
            video_type: getValueByIndex(
                payload.video_type,
                index,
                file.mimetype
            ),
        })) || [];

    const feedVideos =
        uploadedFiles?.feedVideos?.map((file, index) => ({
            video_url: file.location,
            title: getValueByIndex(
                payload.title,
                index,
                file.originalname
            ),
        })) || [];

    const isActive =
        payload.isActive === "false" ? false : true;

    // make previous active highlights inactive
    if (isActive) {
        await Highlights.updateMany(
            { isActive: true },
            {
                $set: {
                    isActive: false,
                },
            }
        );
    }

    const result = await Highlights.create({
        MainVideo_url: mainVideo.location,
        videos,
        feedVideos,
        isActive: payload.isActive === "false" ? false : true,
    });

    return result;
};

const getHighlights = async () => {
    const result = await Highlights.findOne();
    return result;
};

const getActiveHighlights = async () => {
    const result = await Highlights.findOne({ isActive: true });

    if (!result) {
        throw new Error("Active highlights not found");
    }

    return result;
};


const updateHighlights = async (id: string, payload: any, files: any) => {
    const existingHighlights = await Highlights.findById(id);

    if (!existingHighlights) {
        throw new Error("Highlights not found");
    }

    const uploadedFiles = files as UploadedFiles;

    const updatedPayload: any = {};

    if (payload.isActive !== undefined) {
        updatedPayload.isActive =
            payload.isActive === "false" ? false : Boolean(payload.isActive);
    }

    if (uploadedFiles?.MainVideo_url?.[0]?.location) {
        await deleteFromS3(existingHighlights.MainVideo_url);

        updatedPayload.MainVideo_url =
            uploadedFiles.MainVideo_url[0].location;
    }

    if (uploadedFiles?.videos?.length) {
        const newVideos = uploadedFiles.videos.map((file, index) => ({
            video_url: file.location,
            video_name: getValueByIndex(
                payload.video_name,
                index,
                file.originalname
            ),
            video_type: getValueByIndex(
                payload.video_type,
                index,
                file.mimetype
            ),
        }));

        updatedPayload.videos = [
            ...existingHighlights.videos,
            ...newVideos,
        ];
    }

    if (uploadedFiles?.feedVideos?.length) {
        const newFeedVideos = uploadedFiles.feedVideos.map((file, index) => ({
            video_url: file.location,
            title: getValueByIndex(
                payload.title,
                index,
                file.originalname
            ),
        }));

        updatedPayload.feedVideos = [
            ...existingHighlights.feedVideos,
            ...newFeedVideos,
        ];
    }

    const result = await Highlights.findByIdAndUpdate(
        id,
        updatedPayload,
        {
            new: true,
            runValidators: true,
        }
    );

    return result;
};
const deleteHighlights = async (id: string) => {
    const highlights = await Highlights.findById(id);

    if (!highlights) {
        throw new Error("Highlights not found");
    }

    await Promise.all([
        deleteFromS3(highlights.MainVideo_url),
        ...highlights.videos.map((item) => deleteFromS3(item.video_url)),
        ...highlights.feedVideos.map((item) => deleteFromS3(item.video_url)),
    ]);

    const result = await Highlights.findByIdAndDelete(id);

    return result;
};

export const HighlightsServices = {
    createHighlights,
    getHighlights,
    getActiveHighlights,
    updateHighlights,
    deleteHighlights,
};
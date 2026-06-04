import { Schema, model } from "mongoose";

interface IVideo {
    video_url: string;
    video_name: string;
    video_type: string;
}

interface IFeedVideo {
    title: string;
    video_url: string;
}

export interface IHighlights {
    MainVideo_url: string;

    videos: IVideo[];

    feedVideos: IFeedVideo[];

    isActive: boolean;
}

const videoSchema = new Schema<IVideo>(
    {
        video_url: {
            type: String,
            required: [true, "Video URL is required"],
            trim: true,
        },
        video_name: {
            type: String,
            required: [true, "Video name is required"],
            trim: true,
        },
        video_type: {
            type: String,
            required: [true, "Video type is required"],
            trim: true,
        },
    },
    {
        _id: true,
    }
);

const feedVideoSchema = new Schema<IFeedVideo>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        video_url: {
            type: String,
            required: [true, "Video URL is required"],
            trim: true,
        },
    },
    {
        _id: true,
    }
);

const highlightsSchema = new Schema<IHighlights>(
    {
        MainVideo_url: {
            type: String,
            required: [true, "Main video URL is required"],
            trim: true,
        },

        videos: {
            type: [videoSchema],
            default: [],
        },

        feedVideos: {
            type: [feedVideoSchema],
            default: [],
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Highlights = model<IHighlights>(
    "Highlights",
    highlightsSchema
);
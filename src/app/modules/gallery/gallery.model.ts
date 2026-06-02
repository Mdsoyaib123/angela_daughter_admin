// gallery.model.ts

import { Schema, model } from "mongoose";

interface IPhoto {
    _id: string;
    name: string;
    url: string;
    type: string;
}

export interface IGallery {
    bannerFristImg: string;
    bannerSecondImg: string;

    mentorshipImgUrl: string;

    photos: IPhoto[];

    isActive: boolean;
}

const photoSchema = new Schema<IPhoto>(
    {
        name: {
            type: String,
            required: [true, "Photo name is required"],
            trim: true,
        },

        url: {
            type: String,
            required: [true, "Photo URL is required"],
            trim: true,
        },

        type: {
            type: String,
            required: [true, "Photo type is required"],
            trim: true,
        },
    },
    {
        _id: true,
    }
);

const gallerySchema = new Schema<IGallery>(
    {
        bannerFristImg: {
            type: String,
            required: [true, "Banner first image is required"],
            trim: true,
        },

        bannerSecondImg: {
            type: String,
            required: [true, "Banner second image is required"],
            trim: true,
        },

        mentorshipImgUrl: {
            type: String,
            required: [true, "Mentorship image is required"],
            trim: true,
        },

        photos: {
            type: [photoSchema],
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

export const Gallery = model<IGallery>(
    "Gallery",
    gallerySchema
);
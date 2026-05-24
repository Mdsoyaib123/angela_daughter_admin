import { Schema, model } from "mongoose";
import { boolean } from "zod";

interface INumbers {
    toObject(): any;
    PPG: string;
    RPG: string;
    BPG: string;
    DOUBLE_DOUBLES: string;
    REBOUNDS: string;
}

export interface IHome {
    frist_img: string;
    second_img: string;
    NUMBERS: INumbers;
    isActive: boolean
}

const numbersSchema = new Schema<INumbers>(
    {
        PPG: {
            type: String,
            required: [true, "PPG is required"],
            trim: true,
        },

        RPG: {
            type: String,
            required: [true, "RPG is required"],
            trim: true,
        },

        BPG: {
            type: String,
            required: [true, "BPG is required"],
            trim: true,
        },

        DOUBLE_DOUBLES: {
            type: String,
            required: [true, "DOUBLE_DOUBLES is required"],
            trim: true,
        },

        REBOUNDS: {
            type: String,
            required: [true, "REBOUNDS is required"],
            trim: true,
        },
    },
    {
        _id: false,
    }
);

const homeSchema = new Schema<IHome>(
    {
        frist_img: {
            type: String,
            required: [true, "First image is required"],
            trim: true,
        },

        second_img: {
            type: String,
            required: [true, "Second image is required"],
            trim: true,
        },

        NUMBERS: {
            type: numbersSchema,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
);

export const Home = model<IHome>("Home", homeSchema);
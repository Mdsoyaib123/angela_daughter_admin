import { Schema, model } from "mongoose";

export interface IContact {
    directReachout: {
        email: string;
        phone: string;
        location: string;
    };

    getInTouch: {
        email: string;
        phone: string;
        location: string;

        bookingEmail: string;
        bookingDescription: string;

        mediaEmail: string;
        mediaDescription: string;
    };

    isActive: boolean;
}

const contactSchema = new Schema<IContact>(
    {
        directReachout: {
            email: {
                type: String,
                required: [true, "Direct reachout email is required"],
                trim: true,
            },

            phone: {
                type: String,
                required: [true, "Direct reachout phone is required"],
                trim: true,
            },

            location: {
                type: String,
                required: [true, "Direct reachout location is required"],
                trim: true,
            },
        },

        getInTouch: {
            email: {
                type: String,
                required: [true, "Get in touch email is required"],
                trim: true,
            },

            phone: {
                type: String,
                required: [true, "Get in touch phone is required"],
                trim: true,
            },

            location: {
                type: String,
                required: [true, "Get in touch location is required"],
                trim: true,
            },

            bookingEmail: {
                type: String,
                required: [true, "Booking email is required"],
                trim: true,
            },

            mediaEmail: {
                type: String,
                required: [true, "Media email is required"],
                trim: true,
            },

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

export const Contact = model<IContact>("Contact", contactSchema);
import { Schema, model } from "mongoose";

export interface IFooter {

    officialInquiries: {
        email: string;
        phone: string;
        location: string;
    };

    copyrightText: string;


    isActive: boolean;
}

const footerSchema = new Schema<IFooter>(
    {
        officialInquiries: {
            email: {
                type: String,
                required: [true, "Email is required"],
                trim: true,
            },

            phone: {
                type: String,
                required: [true, "Phone is required"],
                trim: true,
            },

            location: {
                type: String,
                required: [true, "Location is required"],
                trim: true,
            },
        },

        copyrightText: {
            type: String,
            required: [true, "Copyright text is required"],
            trim: true,
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

export const Footer = model<IFooter>("Footer", footerSchema);
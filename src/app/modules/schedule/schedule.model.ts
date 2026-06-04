import { Schema, model } from "mongoose";

export interface ISchedule {
    matchName: string;
    date: string;
    address: string;
    isActive: boolean;
}

const scheduleSchema = new Schema<ISchedule>(
    {
        matchName: {
            type: String,
            required: [true, "Match name is required"],
            trim: true,
        },

        date: {
            type: String,
            required: [true, "Date is required"],
            trim: true,
        },

        address: {
            type: String,
            required: [true, "Address is required"],
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

export const Schedule = model<ISchedule>(
    "Schedule",
    scheduleSchema
);
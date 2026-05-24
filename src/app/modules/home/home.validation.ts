import { z } from "zod";

const numbersValidationSchema = z.object({
    PPG: z.string().min(1, "PPG is required"),
    RPG: z.string().min(1, "RPG is required"),
    BPG: z.string().min(1, "BPG is required"),
    DOUBLE_DOUBLES: z.string().min(1, "DOUBLE_DOUBLES is required"),
    REBOUNDS: z.string().min(1, "REBOUNDS is required"),
});

const createHomeValidationSchema = z.object({
    body: z.object({
        frist_img: z.string().min(1, "First image is required"),
        second_img: z.string().min(1, "Second image is required"),
        NUMBERS: numbersValidationSchema,
    }),
});

const updateHomeValidationSchema = z.object({
    body: z.object({
        frist_img: z.string().optional(),
        second_img: z.string().optional(),
        NUMBERS: numbersValidationSchema.partial().optional(),
    }),
});

export const HomeValidation = {
    createHomeValidationSchema,
    updateHomeValidationSchema,
};
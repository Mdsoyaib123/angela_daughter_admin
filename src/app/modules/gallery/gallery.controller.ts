import { Request, Response } from "express";
import { GalleryServices } from "./gallery.service";

const createGallery = async (req: Request, res: Response) => {
    try {
        const result = await GalleryServices.createGallery(req.body, req.files);

        res.status(201).json({
            success: true,
            message: "Gallery created successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create gallery",
        });
    }
};

const getGallery = async (req: Request, res: Response) => {
    try {
        const result = await GalleryServices.getGallery();

        res.status(200).json({
            success: true,
            message: "Gallery retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to retrieve gallery",
        });
    }
};

const getActiveGallery = async (req: Request, res: Response) => {
    try {
        const result = await GalleryServices.getActiveGallery();

        res.status(200).json({
            success: true,
            message: "Active gallery retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message || "Active gallery not found",
        });
    }
};

const updateGallery = async (req: Request, res: Response) => {
    try {
        const result = await GalleryServices.updateGallery(
            req.params.id,
            req.body,
            req.files
        );

        res.status(200).json({
            success: true,
            message: "Gallery updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update gallery",
        });
    }
};

const updateSinglePhoto = async (req: Request, res: Response) => {
    try {
        const result = await GalleryServices.updateSinglePhoto(
            req.params.galleryId,
            req.params.photoId,
            req.body,
            req.file
        );

        res.status(200).json({
            success: true,
            message: "Photo updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update photo",
        });
    }
};

const deleteSinglePhoto = async (req: Request, res: Response) => {
    try {
        const result = await GalleryServices.deleteSinglePhoto(
            req.params.galleryId,
            req.params.photoId
        );

        res.status(200).json({
            success: true,
            message: "Photo deleted successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete photo",
        });
    }
};


const deleteGallery = async (req: Request, res: Response) => {
    try {
        const result = await GalleryServices.deleteGallery(req.params.id);

        res.status(200).json({
            success: true,
            message: "Gallery deleted successfully",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete gallery",
        });
    }
};

export const GalleryControllers = {
    createGallery,
    getGallery,
    getActiveGallery,
    updateGallery,
    deleteGallery,
    updateSinglePhoto,
    deleteSinglePhoto,
};
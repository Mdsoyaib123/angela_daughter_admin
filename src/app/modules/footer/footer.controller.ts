import { Request, Response } from "express";
import { FooterServices } from "./footer.service";

const createFooter = async (req: Request, res: Response) => {
    try {
        const result = await FooterServices.createFooter(req.body);

        res.status(201).json({
            success: true,
            message: "Footer created successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create footer",
        });
    }
};

const getFooters = async (req: Request, res: Response) => {
    try {
        const result = await FooterServices.getFooters();

        res.status(200).json({
            success: true,
            message: "Footers retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to retrieve footers",
        });
    }
};

const getActiveFooter = async (req: Request, res: Response) => {
    try {
        const result = await FooterServices.getActiveFooter();

        res.status(200).json({
            success: true,
            message: "Active footer retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message || "Active footer not found",
        });
    }
};

const updateFooter = async (req: Request, res: Response) => {
    try {
        const result = await FooterServices.updateFooter(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Footer updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update footer",
        });
    }
};

const deleteFooter = async (req: Request, res: Response) => {
    try {
        const result = await FooterServices.deleteFooter(req.params.id);

        res.status(200).json({
            success: true,
            message: "Footer deleted successfully",

        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete footer",
        });
    }
};

export const FooterControllers = {
    createFooter,
    getFooters,
    getActiveFooter,
    updateFooter,
    deleteFooter,
};
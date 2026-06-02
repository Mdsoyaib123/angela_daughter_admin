import { Request, Response } from "express";
import { AboutServices } from "./about.service";

const createAbout = async (req: Request, res: Response) => {
  try {
    const result = await AboutServices.createAbout(req.body, req.files);

    res.status(201).json({
      success: true,
      message: "About created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create about",
    });
  }
};

const getAbout = async (req: Request, res: Response) => {
  try {
    const result = await AboutServices.getAbout();

    res.status(200).json({
      success: true,
      message: "About retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve about",
    });
  }
};

const getActiveAbout = async (req: Request, res: Response) => {
  try {
    const result = await AboutServices.getActiveAbout();

    res.status(200).json({
      success: true,
      message: "Active about retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Active about not found",
    });
  }
};

const updateAbout = async (req: Request, res: Response) => {
  try {
    const result = await AboutServices.updateAbout(
      req.params.id,
      req.body,
      req.files
    );

    res.status(200).json({
      success: true,
      message: "About updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update about",
    });
  }
};

const deleteAbout = async (req: Request, res: Response) => {
  try {
    const result = await AboutServices.deleteAbout(req.params.id);

    res.status(200).json({
      success: true,
      message: "About deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete about",
    });
  }
};

export const AboutControllers = {
  createAbout,
  getAbout,
  getActiveAbout,
  updateAbout,
  deleteAbout,
};
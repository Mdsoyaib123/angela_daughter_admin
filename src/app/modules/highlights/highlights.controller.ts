// highlights.controller.ts

import { Request, Response } from "express";
import { HighlightsServices } from "./highlights.service";

const createHighlights = async (req: Request, res: Response) => {
  try {
    const result = await HighlightsServices.createHighlights(req.body, req.files);

    res.status(201).json({
      success: true,
      message: "Highlights created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create highlights",
    });
  }
};

const getHighlights = async (req: Request, res: Response) => {
  try {
    const result = await HighlightsServices.getHighlights();

    res.status(200).json({
      success: true,
      message: "Highlights retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve highlights",
    });
  }
};

const getActiveHighlights = async (req: Request, res: Response) => {
  try {
    const result = await HighlightsServices.getActiveHighlights();

    res.status(200).json({
      success: true,
      message: "Active highlights retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Active highlights not found",
    });
  }
};

const updateHighlights = async (req: Request, res: Response) => {
  try {
    const result = await HighlightsServices.updateHighlights(
      req.params.id,
      req.body,
      req.files
    );

    res.status(200).json({
      success: true,
      message: "Highlights updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update highlights",
    });
  }
};

const deleteHighlights = async (req: Request, res: Response) => {
  try {
    const result = await HighlightsServices.deleteHighlights(req.params.id);

    res.status(200).json({
      success: true,
      message: "Highlights deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete highlights",
    });
  }
};

export const HighlightsControllers = {
  createHighlights,
  getHighlights,
  getActiveHighlights,
  updateHighlights,
  deleteHighlights,
};
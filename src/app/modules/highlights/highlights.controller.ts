// highlights.controller.ts

import { Request, Response } from "express";
import { HighlightsServices } from "./highlights.service";

const createHighlights = async (req: Request, res: Response) => {
  try {

    console.log("req.file", req.files)
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


const updateSingleVideo = async (req: Request, res: Response) => {
  try {
     console.log("req.file", req.file)

    const result = await HighlightsServices.updateSingleVideo(
      req.params.highlightsId,
      req.params.videoId,
      req.body,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update video",
    });
  }
};

const deleteSingleVideo = async (req: Request, res: Response) => {
  try {
    const result = await HighlightsServices.deleteSingleVideo(
      req.params.highlightsId,
      req.params.videoId
    );

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete video",
    });
  }
};

const updateSingleFeedVideo = async (req: Request, res: Response) => {
  try {
     console.log("req.file", req.file)
    const result = await HighlightsServices.updateSingleFeedVideo(
      req.params.highlightsId,
      req.params.feedVideoId,
      req.body,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Feed video updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update feed video",
    });
  }
};

const deleteSingleFeedVideo = async (req: Request, res: Response) => {
  try {
    const result = await HighlightsServices.deleteSingleFeedVideo(
      req.params.highlightsId,
      req.params.feedVideoId
    );

    res.status(200).json({
      success: true,
      message: "Feed video deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete feed video",
    });
  }
};
const addSingleVideo = async (req: Request, res: Response) => {
  try {
    console.log('hit the api ')
console.log("req.body", req.body)
    console.log("req.file", req.file)
    const result = await HighlightsServices.addSingleVideo(
      req.params.highlightsId,
      req.body,
      req.file
    );

    res.status(201).json({
      success: true,
      message: "Video added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add video",
    });
  }
};

const addSingleFeedVideo = async (req: Request, res: Response) => {
  try {
    const result = await HighlightsServices.addSingleFeedVideo(
      req.params.highlightsId,
      req.body,
      req.file
    );

    res.status(201).json({
      success: true,
      message: "Feed video added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add feed video",
    });
  }
};

export const HighlightsControllers = {
  createHighlights,
  getHighlights,
  getActiveHighlights,
  updateHighlights,
  deleteHighlights,

  updateSingleVideo,
  deleteSingleVideo,
  updateSingleFeedVideo,
  deleteSingleFeedVideo,

  addSingleVideo,
  addSingleFeedVideo,
};
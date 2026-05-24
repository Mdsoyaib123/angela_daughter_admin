import { Request, Response } from "express";
import { HomeServices } from "./home.service";

const createHome = async (req: Request, res: Response) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.MulterS3.File[];
    };
    console.log('files',files)

    const payload = {
      ...req.body,

      frist_img: files?.frist_img?.[0]?.location,

      second_img: files?.second_img?.[0]?.location,
    };

    const result = await HomeServices.createHome(payload);

    res.status(201).json({
      success: true,
      message: "Home data created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create home data",
    });
  }
};
const getHome = async (req: Request, res: Response) => {
  try {
    const result = await HomeServices.getHome();

    res.status(200).json({
      success: true,
      message: "Home data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve home data",
    });
  }
};

const updateHome = async (req: Request, res: Response) => {
  try {
    const files = req.files as {
      [fieldname: string]: Express.MulterS3.File[];
    };

    const payload: any = {
      ...req.body,
    };

    if (files?.frist_img?.[0]?.location) {
      payload.frist_img = files.frist_img[0].location;
    }

    if (files?.second_img?.[0]?.location) {
      payload.second_img = files.second_img[0].location;
    }

    const result = await HomeServices.updateHome(
      req.params.id,
      payload
    );

    res.status(200).json({
      success: true,
      message: "Home data updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update home data",
    });
  }
};

const deleteHome = async (req: Request, res: Response) => {
  try {
    const result = await HomeServices.deleteHome(req.params.id);

    res.status(200).json({
      success: true,
      message: "Home data deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete home data",
    });
  }
};

const getActiveHome = async (req: Request, res: Response) => {
  try {
    const result = await HomeServices.getActiveHome();

    res.status(200).json({
      success: true,
      message: "Active home data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Failed to retrieve active home data",
    });
  }
};

export const HomeControllers = {
  createHome,
  getHome,
  updateHome,
  deleteHome,
  getActiveHome
};
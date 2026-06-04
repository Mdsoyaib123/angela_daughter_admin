import { Request, Response } from "express";
import { ScheduleServices } from "./schedule.service";

const createSchedule = async (req: Request, res: Response) => {
  try {
    const result = await ScheduleServices.createSchedule(req.body);

    res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create schedule",
    });
  }
};

const getSchedules = async (req: Request, res: Response) => {
  try {
    const result = await ScheduleServices.getSchedules();

    res.status(200).json({
      success: true,
      message: "Schedules retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve schedules",
    });
  }
};



const getSingleSchedule = async (req: Request, res: Response) => {
  try {
    const result = await ScheduleServices.getSingleSchedule(req.params.id);

    res.status(200).json({
      success: true,
      message: "Schedule retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Schedule not found",
    });
  }
};

const updateSchedule = async (req: Request, res: Response) => {
  try {
    const result = await ScheduleServices.updateSchedule(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update schedule",
    });
  }
};

const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const result = await ScheduleServices.deleteSchedule(req.params.id);

    res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete schedule",
    });
  }
};

export const ScheduleControllers = {
  createSchedule,
  getSchedules,
  getSingleSchedule,
  updateSchedule,
  deleteSchedule,
};
import express from "express";
import { ScheduleControllers } from "./schedule.controller";

const router = express.Router();

router.post("/create", ScheduleControllers.createSchedule);

router.get("/getAll", ScheduleControllers.getSchedules);


router.get("/getSingle/:id", ScheduleControllers.getSingleSchedule);

router.patch("/update/:id", ScheduleControllers.updateSchedule);

router.delete("/delete/:id", ScheduleControllers.deleteSchedule);

export const ScheduleRoutes = router;
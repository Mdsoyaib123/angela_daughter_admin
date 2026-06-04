import { Schedule } from "./schedule.model";

const createSchedule = async (payload: any) => {
    const result = await Schedule.create(payload);
    return result;
};

const getSchedules = async () => {
    const result = await Schedule.find().sort({ createdAt: -1 });
    return result;
};

const getSingleSchedule = async (id: string) => {
    const result = await Schedule.findById(id);

    if (!result) {
        throw new Error("Schedule not found");
    }

    return result;
};

const updateSchedule = async (id: string, payload: any) => {
    const result = await Schedule.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (!result) {
        throw new Error("Schedule not found");
    }

    return result;
};

const deleteSchedule = async (id: string) => {
    const result = await Schedule.findByIdAndDelete(id);

    if (!result) {
        throw new Error("Schedule not found");
    }

    return result;
};

export const ScheduleServices = {
    createSchedule,
    getSchedules,
    getSingleSchedule,
    updateSchedule,
    deleteSchedule,
};
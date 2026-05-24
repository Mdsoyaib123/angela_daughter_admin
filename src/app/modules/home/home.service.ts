import { deleteFromS3 } from "../../utils/deleteFromS3";
import { Home } from "./home.model";

const createHome = async (payload: any) => {
    const NUMBERS = {
        PPG: payload.PPG,
        RPG: payload.RPG,
        BPG: payload.BPG,
        DOUBLE_DOUBLES: payload.DOUBLE_DOUBLES,
        REBOUNDS: payload.REBOUNDS
    }

    const isActive =
        payload.isActive === "false" ? false : true;

    // make previous active highlights inactive
    if (isActive) {
        await Home.updateMany(
            { isActive: true },
            {
                $set: {
                    isActive: false,
                },
            }
        );
    }


    const result = await Home.create({ ...payload, NUMBERS });
    return result;
};

const getHome = async () => {
    const result = await Home.findOne();
    return result;
};

const updateHome = async (id: string, payload: any) => {
    const existingHome = await Home.findById(id);

    if (!existingHome) {
        throw new Error("Home data not found");
    }

    // delete old first image if new uploaded
    if (
        payload.frist_img &&
        payload.frist_img !== existingHome.frist_img
    ) {
        await deleteFromS3(existingHome.frist_img);
    }

    // delete old second image if new uploaded
    if (
        payload.second_img &&
        payload.second_img !== existingHome.second_img
    ) {
        await deleteFromS3(existingHome.second_img);
    }

    const updatedPayload: any = {
        ...payload,
    };

    // partial NUMBERS update
    if (
        payload.PPG ||
        payload.RPG ||
        payload.BPG ||
        payload.DOUBLE_DOUBLES ||
        payload.REBOUNDS
    ) {
        updatedPayload.NUMBERS = {
            ...existingHome.NUMBERS?.toObject(),

            ...(payload.PPG && { PPG: payload.PPG }),
            ...(payload.RPG && { RPG: payload.RPG }),
            ...(payload.BPG && { BPG: payload.BPG }),
            ...(payload.DOUBLE_DOUBLES && {
                DOUBLE_DOUBLES: payload.DOUBLE_DOUBLES,
            }),
            ...(payload.REBOUNDS && {
                REBOUNDS: payload.REBOUNDS,
            }),
        };
    }

    const result = await Home.findByIdAndUpdate(
        id,
        updatedPayload,
        {
            new: true,
            runValidators: true,
        }
    );

    return result;
};

const deleteHome = async (id: string) => {
    const home = await Home.findById(id);

    if (!home) {
        throw new Error("Home data not found");
    }

    await Promise.all([
        deleteFromS3(home.frist_img),
        deleteFromS3(home.second_img),
    ]);

    const result = await Home.findByIdAndDelete(id);

    return result;
};

const getActiveHome = async () => {
    const result = await Home.findOne({ isActive: true });

    if (!result) {
        throw new Error("Active home data not found");
    }

    return result;
};

export const HomeServices = {
    createHome,
    getHome,
    updateHome,
    deleteHome,
    getActiveHome
};
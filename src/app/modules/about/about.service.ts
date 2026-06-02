import { About } from "./about.model";
import { deleteFromS3 } from "../../utils/deleteFromS3";

type UploadedFiles = {
    [fieldname: string]: Express.MulterS3.File[];
};

const getFileUrl = (files: UploadedFiles, fieldName: string) => {
    return files?.[fieldName]?.[0]?.location;
};

const imageFields = [
    "bannerImgUrl",
    "earlyBeginningImgUrl",
    "fristVictoryImgUrl",
    "tranningImgUrl",
    "accoladesMilestonesImgUrl",
    "playerReflectionImgUrl",
];

const createAbout = async (payload: any, files: any) => {
    const uploadedFiles = files as UploadedFiles;

    const isActive = payload.isActive === "false" ? false : true;

    if (isActive) {
        await About.updateMany({ isActive: true }, { $set: { isActive: false } });
    }

    const result = await About.create({
        bannerImgUrl: getFileUrl(uploadedFiles, "bannerImgUrl"),
        earlyBeginningImgUrl: getFileUrl(uploadedFiles, "earlyBeginningImgUrl"),
        fristVictoryImgUrl: getFileUrl(uploadedFiles, "fristVictoryImgUrl"),
        tranningImgUrl: getFileUrl(uploadedFiles, "tranningImgUrl"),
        accoladesMilestonesImgUrl: getFileUrl(
            uploadedFiles,
            "accoladesMilestonesImgUrl"
        ),
        playerReflectionImgUrl: getFileUrl(uploadedFiles, "playerReflectionImgUrl"),

        totalGamePlayed: payload.totalGamePlayed,
        totalMajorReward: payload.totalMajorReward,

        isActive,
    });


    return result;
};

const getAbout = async () => {
    return await About.find();
};

const getActiveAbout = async () => {
    const result = await About.findOne({ isActive: true });

    if (!result) {
        throw new Error("Active about not found");
    }

    return result;
};

const updateAbout = async (id: string, payload: any, files: any) => {
    const existingAbout = await About.findById(id);

    if (!existingAbout) {
        throw new Error("About not found");
    }

    const uploadedFiles = files as UploadedFiles;

    const updatedPayload: any = {
        ...payload,
    };

    for (const field of imageFields) {
        const newFileUrl = getFileUrl(uploadedFiles, field);

        if (newFileUrl) {
            await deleteFromS3((existingAbout as any)[field]);
            updatedPayload[field] = newFileUrl;
        }
    }

    if (payload.isActive !== undefined) {
        updatedPayload.isActive = payload.isActive === "false" ? false : true;

        if (updatedPayload.isActive) {
            await About.updateMany(
                { _id: { $ne: id }, isActive: true },
                { $set: { isActive: false } }
            );
        }
    }

    const result = await About.findByIdAndUpdate(id, updatedPayload, {
        new: true,
        runValidators: true,
    });

    return result;
};

const deleteAbout = async (id: string) => {
    const about = await About.findById(id);

    if (!about) {
        throw new Error("About not found");
    }

    await Promise.all(
        imageFields.map((field) => deleteFromS3((about as any)[field]))
    );

    const result = await About.findByIdAndDelete(id);

    return result;
};

export const AboutServices = {
    createAbout,
    getAbout,
    getActiveAbout,
    updateAbout,
    deleteAbout,
};
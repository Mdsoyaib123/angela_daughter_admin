import { Gallery } from "./gallery.model";
import { deleteFromS3 } from "../../utils/deleteFromS3";

type UploadedFiles = {
    [fieldname: string]: Express.MulterS3.File[];
};

const getFileUrl = (files: UploadedFiles, fieldName: string) => {
    return files?.[fieldName]?.[0]?.location;
};

const getValueByIndex = (value: any, index: number, fallback: string) => {
    if (Array.isArray(value)) {
        return value[index] || fallback;
    }

    return value || fallback;
};

const createGallery = async (payload: any, files: any) => {
    const uploadedFiles = files as UploadedFiles;

    const bannerFristImg = getFileUrl(uploadedFiles, "bannerFristImg");
    const bannerSecondImg = getFileUrl(uploadedFiles, "bannerSecondImg");
    const mentorshipImgUrl = getFileUrl(uploadedFiles, "mentorshipImgUrl");

    if (!bannerFristImg) {
        throw new Error("Banner first image is required");
    }

    if (!bannerSecondImg) {
        throw new Error("Banner second image is required");
    }

    if (!mentorshipImgUrl) {
        throw new Error("Mentorship image is required");
    }

    const photos =
        uploadedFiles?.photos?.map((file, index) => ({
            url: file.location,
            name: getValueByIndex(payload.name, index, file.originalname),
            type: getValueByIndex(payload.type, index, file.mimetype),
        })) || [];

    const isActive = payload.isActive === "false" ? false : true;

    if (isActive) {
        await Gallery.updateMany(
            { isActive: true },
            { $set: { isActive: false } }
        );
    }

    const result = await Gallery.create({
        bannerFristImg,
        bannerSecondImg,
        mentorshipImgUrl,
        photos,
        isActive,
    });

    return result;
};

const getGallery = async () => {
    return await Gallery.find();
};

const getActiveGallery = async () => {
    const result = await Gallery.findOne({ isActive: true });

    if (!result) {
        throw new Error("Active gallery not found");
    }

    return result;
};

const updateGallery = async (id: string, payload: any, files: any) => {
    const existingGallery = await Gallery.findById(id);

    if (!existingGallery) {
        throw new Error("Gallery not found");
    }

    const uploadedFiles = files as UploadedFiles;

    const updatedPayload: any = {};

    const imageFields = [
        "bannerFristImg",
        "bannerSecondImg",
        "mentorshipImgUrl",
    ];

    for (const field of imageFields) {
        const newFileUrl = getFileUrl(uploadedFiles, field);

        if (newFileUrl) {
            await deleteFromS3((existingGallery as any)[field]);
            updatedPayload[field] = newFileUrl;
        }
    }

    if (uploadedFiles?.photos?.length) {
        const newPhotos = uploadedFiles.photos.map((file, index) => ({
            url: file.location,
            name: getValueByIndex(payload.name, index, file.originalname),
            type: getValueByIndex(payload.type, index, file.mimetype),
        }));

        updatedPayload.photos = [
            ...existingGallery.photos,
            ...newPhotos,
        ];
    }

    if (payload.isActive !== undefined) {
        updatedPayload.isActive = payload.isActive === "false" ? false : true;

        if (updatedPayload.isActive) {
            await Gallery.updateMany(
                { _id: { $ne: id }, isActive: true },
                { $set: { isActive: false } }
            );
        }
    }

    const result = await Gallery.findByIdAndUpdate(id, updatedPayload, {
        new: true,
        runValidators: true,
    });

    return result;
};

const updateSinglePhoto = async (
    galleryId: string,
    photoId: string,
    payload: any,
    file: any
) => {
    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
        throw new Error("Gallery not found");
    }

    const photoIndex = gallery.photos.findIndex(
        (photo: any) => photo._id?.toString() === photoId
    );

    if (photoIndex === -1) {
        throw new Error("Photo not found");
    }

    const existingPhoto: any = gallery.photos[photoIndex];

    if (file?.location) {
        await deleteFromS3(existingPhoto.url);
        existingPhoto.url = file.location;
    }

    if (payload.name) {
        existingPhoto.name = payload.name;
    }

    if (payload.type) {
        existingPhoto.type = payload.type;
    }

    gallery.photos[photoIndex] = existingPhoto;

    await gallery.save();

    return gallery;
};

const deleteSinglePhoto = async (
    galleryId: string,
    photoId: string
) => {
    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
        throw new Error("Gallery not found");
    }

    const photoIndex = gallery.photos.findIndex(
        (photo: any) => photo._id?.toString() === photoId
    );

    if (photoIndex === -1) {
        throw new Error("Photo not found");
    }

    const existingPhoto: any = gallery.photos[photoIndex];

    await deleteFromS3(existingPhoto.url);

    gallery.photos.splice(photoIndex, 1);

    await gallery.save();

    return gallery;
};


const deleteGallery = async (id: string) => {
    const gallery = await Gallery.findById(id);

    if (!gallery) {
        throw new Error("Gallery not found");
    }

    await Promise.all([
        deleteFromS3(gallery.bannerFristImg),
        deleteFromS3(gallery.bannerSecondImg),
        deleteFromS3(gallery.mentorshipImgUrl),
        ...gallery.photos.map((photo) => deleteFromS3(photo.url)),
    ]);

    const result = await Gallery.findByIdAndDelete(id);

    return result;
};


export const GalleryServices = {
    createGallery,
    getGallery,
    getActiveGallery,
    updateGallery,
    deleteGallery,
    updateSinglePhoto,
    deleteSinglePhoto,
};
import { Footer } from "./footer.model";

const createFooter = async (payload: any) => {
    const isActive =
        payload.isActive === false || payload.isActive === "false" ? false : true;

    if (isActive) {
        await Footer.updateMany({ isActive: true }, { $set: { isActive: false } });
    }

    return await Footer.create({
        ...payload,
        isActive,
    });
};

const getFooters = async () => {
    return await Footer.find();
};

const getActiveFooter = async () => {
    const result = await Footer.findOne({ isActive: true });

    if (!result) {
        throw new Error("Active footer not found");
    }

    return result;
};

const updateFooter = async (id: string, payload: any) => {
    const existingFooter = await Footer.findById(id);

    if (!existingFooter) {
        throw new Error("Footer not found");
    }

    const updatedPayload: any = {
        ...payload,
    };

    if (payload.isActive !== undefined) {
        updatedPayload.isActive =
            payload.isActive === false || payload.isActive === "false" ? false : true;

        if (updatedPayload.isActive) {
            await Footer.updateMany(
                { _id: { $ne: id }, isActive: true },
                { $set: { isActive: false } }
            );
        }
    }

    return await Footer.findByIdAndUpdate(id, updatedPayload, {
        new: true,
        runValidators: true,
    });
};

const deleteFooter = async (id: string) => {
    const result = await Footer.findByIdAndDelete(id);

    if (!result) {
        throw new Error("Footer not found");
    }

    return result;
};

export const FooterServices = {
    createFooter,
    getFooters,
    getActiveFooter,
    updateFooter,
    deleteFooter,
};
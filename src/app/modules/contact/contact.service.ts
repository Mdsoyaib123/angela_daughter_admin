import { Contact } from "./contact.model";

const createContact = async (payload: any) => {
    const isActive = payload.isActive === false || payload.isActive === "false" ? false : true;

    if (isActive) {
        await Contact.updateMany(
            { isActive: true },
            { $set: { isActive: false } }
        );
    }

    const result = await Contact.create({
        ...payload,
        isActive,
    });

    return result;
};

const getContacts = async () => {
    return await Contact.find();
};

const getActiveContact = async () => {
    const result = await Contact.findOne({ isActive: true });

    if (!result) {
        throw new Error("Active contact not found");
    }

    return result;
};

const updateContact = async (id: string, payload: any) => {
    const existingContact = await Contact.findById(id);

    if (!existingContact) {
        throw new Error("Contact not found");
    }

    const updatedPayload: any = {};

    if (payload.directReachout) {
        updatedPayload.directReachout = {
            ...existingContact.directReachout,
            ...payload.directReachout,
        };
    }

    if (payload.getInTouch) {
        updatedPayload.getInTouch = {
            ...existingContact.getInTouch,
            ...payload.getInTouch,
        };
    }

    if (payload.isActive !== undefined) {
        updatedPayload.isActive =
            payload.isActive === false || payload.isActive === "false"
                ? false
                : true;

        if (updatedPayload.isActive) {
            await Contact.updateMany(
                {
                    _id: { $ne: id },
                    isActive: true,
                },
                {
                    $set: {
                        isActive: false,
                    },
                }
            );
        }
    }

    const result = await Contact.findByIdAndUpdate(id, updatedPayload, {
        new: true,
        runValidators: true,
    });

    return result;
};

const deleteContact = async (id: string) => {
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
        throw new Error("Contact not found");
    }

    return result;
};

export const ContactServices = {
    createContact,
    getContacts,
    getActiveContact,
    updateContact,
    deleteContact,
};
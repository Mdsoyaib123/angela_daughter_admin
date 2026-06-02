import { Request, Response } from "express";
import { ContactServices } from "./contact.service";

const createContact = async (req: Request, res: Response) => {
    try {
        const result = await ContactServices.createContact(req.body);

        res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create contact",
        });
    }
};

const getContacts = async (req: Request, res: Response) => {
    try {
        const result = await ContactServices.getContacts();

        res.status(200).json({
            success: true,
            message: "Contacts retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to retrieve contacts",
        });
    }
};

const getActiveContact = async (req: Request, res: Response) => {
    try {
        const result = await ContactServices.getActiveContact();

        res.status(200).json({
            success: true,
            message: "Active contact retrieved successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message || "Active contact not found",
        });
    }
};

const updateContact = async (req: Request, res: Response) => {
    try {
        const result = await ContactServices.updateContact(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update contact",
        });
    }
};

const deleteContact = async (req: Request, res: Response) => {
    try {
        const result = await ContactServices.deleteContact(req.params.id);

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to delete contact",
        });
    }
};

export const ContactControllers = {
    createContact,
    getContacts,
    getActiveContact,
    updateContact,
    deleteContact,
};
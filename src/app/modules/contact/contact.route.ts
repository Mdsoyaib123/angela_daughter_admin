import express from "express";
import { ContactControllers } from "./contact.controller";

const router = express.Router();

router.post("/create", ContactControllers.createContact);

router.get("/getAll", ContactControllers.getContacts);

router.get("/get/active", ContactControllers.getActiveContact);

router.patch("/update/:id", ContactControllers.updateContact);

router.delete("/delete/:id", ContactControllers.deleteContact);

export const ContactRoutes = router;
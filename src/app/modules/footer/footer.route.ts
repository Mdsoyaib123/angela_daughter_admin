import express from "express";
import { FooterControllers } from "./footer.controller";

const router = express.Router();

router.post("/create", FooterControllers.createFooter);

router.get("/get", FooterControllers.getFooters);

router.get("/get/active", FooterControllers.getActiveFooter);

router.patch("/update/:id", FooterControllers.updateFooter);

router.delete("/delete/:id", FooterControllers.deleteFooter);

export const FooterRoutes = router;
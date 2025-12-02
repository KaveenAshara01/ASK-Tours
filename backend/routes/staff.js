import express from "express";
import {
    createStaff,
    updateStaff,
    deleteStaff,
    getAllStaff,
    getAvailableStaff,
    getSingleStaff,
} from "../controllers/staffController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

import upload from "../utils/upload.js";

const router = express.Router();

router.post("/", verifyAdmin, upload('staff_images').single('photo'), createStaff);
router.put("/:id", verifyAdmin, updateStaff);
router.delete("/:id", verifyAdmin, deleteStaff);
router.get("/admin", verifyAdmin, getAllStaff);
router.get("/", getAvailableStaff);
router.get("/:id", getSingleStaff);

export default router;

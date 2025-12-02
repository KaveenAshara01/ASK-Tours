import express from 'express';
import { createTour, deleteTour, getAllTours, getFeaturedTour, getFilteredTours, getSingleTour, getTourCount, updateTour } from "./../controllers/tourController.js";
import { verifyAdmin } from '../utils/verifyToken.js';
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/", verifyAdmin, upload('tour_images').fields([
    { name: 'mainPhoto', maxCount: 1 },
    { name: 'photos', maxCount: 8 }
]), createTour);

router.put("/:id", verifyAdmin, upload('tour_images').fields([
    { name: 'mainPhoto', maxCount: 1 },
    { name: 'photos', maxCount: 8 }
]), updateTour);

router.delete("/:id", verifyAdmin, deleteTour);

router.get("/:id", getSingleTour);

router.get("/", getAllTours);

router.get("/search/getTourBySearch", getFilteredTours);

router.get("/search/getFeaturedTour", getFeaturedTour);

router.get("/search/getTourCount", getTourCount);

export default router;
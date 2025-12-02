import Staff from "../models/Staff.js";

// Create Staff
export const createStaff = async (req, res) => {
    const newStaff = new Staff(req.body);
    if (req.file) {
        newStaff.photo = req.file.path
    }

    try {
        const savedStaff = await newStaff.save();
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedStaff,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create. Try again" });
    }
};

// Update Staff
export const updateStaff = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedStaff,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};

// Delete Staff
export const deleteStaff = async (req, res) => {
    const id = req.params.id;

    try {
        await Staff.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

// Get Single Staff
export const getSingleStaff = async (req, res) => {
    const id = req.params.id;

    try {
        const staff = await Staff.findById(id);
        res.status(200).json({
            success: true,
            message: "Successfully fetched",
            data: staff,
        });
    } catch (error) {
        res.status(404).json({ success: false, message: "Not found" });
    }
};

// Get All Staff (Admin)
export const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find({});
        res.status(200).json({
            success: true,
            message: "Successfully fetched",
            data: staff,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch" });
    }
};

// Get Available Staff (Public)
export const getAvailableStaff = async (req, res) => {
    try {
        const staff = await Staff.find({ isAvailable: true });
        res.status(200).json({
            success: true,
            message: "Successfully fetched",
            data: staff,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch" });
    }
};

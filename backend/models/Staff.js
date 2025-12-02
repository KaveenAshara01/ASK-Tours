import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        photo: {
            type: String,
        },
        role: {
            type: String,
            enum: ["driver", "guide"],
            required: true,
        },
        phone: {
            type: String,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        vehicle: {
            type: String,
            required: function () {
                return this.role === "driver";
            },
        },
        languages: {
            type: [String],
            required: function () {
                return this.role === "guide";
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);

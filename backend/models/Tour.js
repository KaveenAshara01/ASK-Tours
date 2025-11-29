import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    cities: {
      type: [String], // Changed to an array of strings for multiple cities
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String], // Array to store multiple photo URLs
    },
    mainPhoto: {
      type: String, // Separate field for the main photo
      required: true, // Ensure at least the main photo is provided
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    tourType: {
      type: String, // New field for the type of the tour
      required: true, // Ensure this field is mandatory
      enum: ["Adventure", "Relaxation", "Cultural", "Wildlife", "Other"], // Example predefined categories
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);

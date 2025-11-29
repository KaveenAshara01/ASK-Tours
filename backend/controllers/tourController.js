import Tour from "../models/Tour.js";

// create new tour

export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

// update tour
export const updateTour = async (req, res) => {
  const id = req.params.id; // Get the tour ID from the URL parameters
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the tour by ID and update it with the new data
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: updatedData }, // Use $set to update only the provided fields
      { new: true, runValidators: true } // Return the updated document and validate the updates
    );

    if (!updatedTour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update the tour. Please try again.",
    });
  }
};

//delete Tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
      data: deletedTour, // Optionally return the deleted tour data
    });
  } catch (error) {
    console.error("Error deleting tour:", error); // Log the actual error
    res.status(500).json({
      success: false,
      message: "Failed to delete the tour. Please try again.",
    });
  }
};

// get single tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate('reviews');

    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour fetched successfully",
      data: tour,
    });
  } catch (error) {
    console.error("Error fetching the tour:", error); // Log the actual error
    res.status(500).json({
      success: false,
      message: "Failed to fetch the tour. Please try again.",
    });
  }
};

// get all tours
export const getAllTours = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate('reviews')
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Tours fetched successfully",
      data: tours,
    });
  } catch (error) {
    console.error("Error fetching the tours:", error); // Log the actual error
    res.status(500).json({
      success: false,
      message: "Failed to fetch the tours. Please try again.",
    });
  }
};

// get tour by search
export const getFilteredTours = async (req, res) => {
  try {
    console.log("Incoming request to getFilteredTours...");

    // Extract filter parameters from the query string
    const { tourType, maxPrice } = req.query;

    // Log the received query parameters
    console.log("Query Parameters:");
    console.log("tourType:", tourType);
    console.log("maxPrice:", maxPrice);

    // Check if both fields are provided
    if (!tourType || !maxPrice) {
      console.warn("Missing required query parameters.");
      return res.status(400).json({
        success: false,
        message: "Both 'tourType' and 'maxPrice' fields are required.",
      });
    }

    // Build the query object
    const query = {
      tourType, // Filter by tour type
      price: { $lte: Number(maxPrice) }, // Filter by price (ensure maxPrice is a number)
    };

    // Log the constructed query object
    console.log("Constructed Query Object:", query);

    // Execute the query to get the filtered tours
    const filteredTours = await Tour.find(query).populate('reviews');

    // Log the filtered tours result
    console.log("Filtered Tours Retrieved:", filteredTours);

    // Return the response
    res.status(200).json({
      success: true,
      message: "Filtered tours fetched successfully",
      data: filteredTours,
    });
  } catch (error) {
    console.error("Error fetching filtered tours:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch filtered tours. Please try again.",
    });
  }
};

// get featured tour

export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).limit(8).populate('reviews');
    res.status(200).json({
      success: true,
      message: "Tours fetched successfully",
      data: tours,
    });
  } catch (error) {
    console.error("Error fetching the tours:", error); // Log the actual error
    res.status(500).json({
      success: false,
      message: "Failed to fetch the tours. Please try again.",
    });
  }
};

// get tour count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};

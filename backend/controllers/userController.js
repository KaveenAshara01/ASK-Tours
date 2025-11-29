import User from "../models/User.js";

// create new User

export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

// update User
export const updateUser = async (req, res) => {
  const id = req.params.id; // Get the User ID from the URL parameters
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the User by ID and update it with the new data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedData }, // Use $set to update only the provided fields
      { new: true, runValidators: true } // Return the updated document and validate the updates
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating User:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update the User. Please try again.",
    });
  }
};

//delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser, // Optionally return the deleted User data
    });
  } catch (error) {
    console.error("Error deleting User:", error); // Log the actual error
    res.status(500).json({
      success: false,
      message: "Failed to delete the User. Please try again.",
    });
  }
};

// get single User
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching the User:", error); // Log the actual error
    res.status(500).json({
      success: false,
      message: "Failed to fetch the User. Please try again.",
    });
  }
};

// get all Users
export const getAllUsers = async (req, res) => {
  

  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
     
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching the Users:", error); // Log the actual error
    res.status(500).json({
      success: false,
      message: "Failed to fetch the Users. Please try again.",
    });
  }
};

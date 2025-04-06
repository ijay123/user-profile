import axios from "axios";

const user = axios.create({
  baseURL: `${import.meta.env.VITE_USER_PROFILE_BACKEND_URL}/api/users`,
  headers: {
    "Content-Type": "application/json",
  },
});


// Create User
const createUser = async (userData) => {
  try {
    const response = await user.post("/", userData);
    return response.data;
  } catch (err) {
    console.error("Error in createUser:", err);
    throw new Error(err.response?.data?.message || "Failed to create user");
  }
};

// Get All Users (pagination removed)
const getUsers = async () => {
  try {
    const response = await user.get("/");
    const users = response.data.users;
    console.log("Users Data:", users);
    return users;
  } catch (err) {
    console.error("Error in getUsers:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch users");
  }
};

// Get Single User
const getUser = async (userId) => {
  try {
    const response = await user.get(`/${userId}`);
    if (!response.data) {
      throw new Error("User not found");
    }
    return response.data;
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || "Failed to fetch user";
    console.error("Error in getUser:", errorMessage);
    throw new Error(errorMessage);
  }
};

// Update User
const updateUser = async (userId, userData) => {
  try {
    console.log("Sending update request for user ID:", userId);
    console.log("Update data:", userData);

    const response = await user.patch(`/${userId}`, userData);

    if (response && response.data) {
      console.log("Update successful:", response.data);
      return {
        success: true,
        data: response.data,
      };
    } else {
      throw new Error("No data received from server");
    }
  } catch (err) {
    console.error("Error in updateUser:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update user",
    };
  }
};

// Delete User
const deleteUser = async (userId) => {
  try {
    const response = await user.delete(`/${userId}`);
    return response.data;
  } catch (err) {
    console.error("Error in deleteUser:", err);
    throw new Error(err.response?.data?.message || "Failed to delete user");
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };

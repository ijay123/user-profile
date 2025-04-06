import axios from "axios";

const user = axios.create({
  baseURL: "https://user-profile-backend-k1b0.onrender.com/users", // Adjust based on your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Create User
const createUser = async (userData) => {
  try {
    const response = await user.post("/", userData);
    return response.data; // Return the created user data
  } catch (err) {
    console.error("Error in createUser:", err);  // Log for debugging
    throw new Error(err.response?.data?.message || "Failed to create user");
  }
};

// Get All Users
// Get All Users
const getUsers = async (page = 1, limit = 10, search = "") => {
  try {
    const response = await user.get("/", {
      params: { page, limit, search },
    });

    const users = response.data.data.records;  // Extract user data
    const pagination = response.data;  // Extract pagination info (contains currentPage, totalPages etc.)
    console.log("Users Data:", users); // Log the array of users
    console.log("Pagination Info:", pagination);  // Log the pagination data

    return { users, pagination };  // Return both users and pagination info
  } catch (err) {
    console.error("Error in getUsers:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch users");
  }
};


  

// Get Single User
const getUser = async (userId) => {
  try {
    // Sending GET request to fetch user data by ID
    const response = await user.get(`/${userId}`);
    console.log(response.data, "userid")
    // Check if response has a valid data object
    if (!response.data) {
      throw new Error("User not found");
    }

    // Return the user data
    return response.data;
   
  } catch (err) {
    // Improved error handling
    const errorMessage = err.response?.data?.message || err.message || "Failed to fetch user";
    console.error("Error in getUser:", errorMessage);
    throw new Error(errorMessage); // Re-throw the error with a proper message
  }
};


// Update User
const updateUser = async (userId, userData) => {
  try {
    console.log('Sending update request for user ID:', userId);
    console.log('Update data:', userData);
    
    const response = await user.patch(`/${userId}`, userData);

    if (response && response.data) {
      console.log('Update successful:', response.data);
      return { 
        success: true,
        data: response.data
      };
    } else {
      throw new Error('No data received from server');
    }
  } catch (err) {
    console.error("Error in updateUser:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update user"
    };
  }
};


// Delete User
const deleteUser = async (userId) => {
  try {
    const response = await user.delete(`/${userId}`);
    return response.data; // Return the confirmation message
  } catch (err) {
    console.error("Error in deleteUser:", err);  // Log for debugging
    throw new Error(err.response?.data?.message || "Failed to delete user");
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };

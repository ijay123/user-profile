import User from "../../model/user/user.js";
import httpStatus from "http-status";

const createUser = async (req, res) => {
  const data = req.body;

  const emailExist = await User.findOne({ name: data.name });
  if (emailExist) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "User with email already exists",
    });
  }

  const createdUser = await User.create({
    name: data.name,
    email: data.email,
  });

  return res.status(httpStatus.CREATED).json({
    status: "success",
    data: createdUser,
  });
};

const getUsers = async (req, res) => {
  try {
    const { search = "" } = req.query; 
    
    let users;

    if (search) {
      
      users = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } }, 
          { email: { $regex: search, $options: "i" } } 
        ]
      }).sort({ createdAt: -1 });
    } else {
     
      users = await User.find().sort({ createdAt: -1 });
    }

    return res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};


const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(httpStatus.OK).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to fetch user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "User not found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    return res.status(httpStatus.OK).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to update user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(httpStatus.OK).json({
      status: "success",
      data: `User with ID ${id} is deleted`,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to delete user",
    });
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };

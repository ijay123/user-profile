import express from "express";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../controllers/user/UserSchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
const router = express.Router();
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user/User.js";

// Create and Get Users (POST, GET)
router
  .route("/")
  .post(validationMiddleware(createUserSchema), createUser)
  .get(getUsers);

// Get, Update, and Delete User by ID (GET, PATCH, DELETE)
router
  .route("/:id")
  .get(validationMiddleware(getUserSchema, "params"), getUser) // Changed 'QUERY' to 'params' for validation
  .patch(validationMiddleware(updateUserSchema), updateUser)
  .delete(validationMiddleware(deleteUserSchema), deleteUser);

export default router;

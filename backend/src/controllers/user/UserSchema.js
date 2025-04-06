import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
});

export const getUserSchema = Joi.object({
  id: Joi.string().optional(),
});

export const getUsersSchema = Joi.object({
  email: Joi.string().optional(),
  name: Joi.string().optional(),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
})
  .or("name", "email")
  .unknown(false); // Disallow unknown fields (like _id, createdAt, updatedAt, etc.)

export const deleteUserSchema = Joi.object({
  id: Joi.string().optional,
});

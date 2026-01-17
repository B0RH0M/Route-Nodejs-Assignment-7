import { Router } from "express";
import { addNewUser, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser } from "./users.service.js";
const router = Router();

// end point to get all users
router.get("/", getAllUsers);

// end point to fetch user by email (string query)
router.get("/by-email", getUserByEmail);

// end point to get user by id
router.get("/:id", getUserById);


// end point to add new user
router.post("/signup", addNewUser);


// end point to update user
router.put("/:id", updateUser);


// end point to delete user
router.delete("/:id", deleteUser);

export default router;
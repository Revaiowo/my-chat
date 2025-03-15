import express from "express";
import {
	userRegister,
	userLogin,
	userLogout,
	userCheckIn,
	updateProfile,
} from "../controllers/auth.controller";
import authenticateUser from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("/logout", authenticateUser, userLogout);

router.get("/checkIn", authenticateUser, userCheckIn);

router.put("/profile", authenticateUser, updateProfile);

export default router;

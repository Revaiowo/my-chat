import express from "express";
import {
	userRegister,
	userLogin,
	userLogout,
	userCheckIn,
} from "../controllers/auth.controller";
import authenticateUser from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.post("/logout", authenticateUser, userLogout);

router.get("/checkIn", authenticateUser, userCheckIn);

export default router;

import express from "express";
import authenticateUser from "../middleware/auth.middleware";
import {
	sendMessage,
	getMessages,
	getUsers,
} from "../controllers/message.controller";

const router = express.Router();

router.post("/send/:id", authenticateUser, sendMessage);

router.get("/:id", authenticateUser, getMessages);

router.get("/user/sidebar", authenticateUser, getUsers);

export default router;

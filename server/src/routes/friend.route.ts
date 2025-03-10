import express from "express";
import {
	acceptFriendRequest,
	rejectFriendRequest,
	sendFriendRequest,
} from "../controllers/friend.controller";
import authenticateUser from "../middleware/auth.middleware";

const router = express.Router();

router.post("/send", authenticateUser, sendFriendRequest);

router.post("/accept", authenticateUser, acceptFriendRequest);

router.post("/reject", authenticateUser, rejectFriendRequest);

export default router;

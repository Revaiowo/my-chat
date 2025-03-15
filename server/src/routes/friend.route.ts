import express from "express";
import {
	acceptFriendRequest,
	rejectFriendRequest,
	sendFriendRequest,
	getFriendRequests,
	getFriends,
} from "../controllers/friend.controller";
import authenticateUser from "../middleware/auth.middleware";

const router = express.Router();

router.post("/send", authenticateUser, sendFriendRequest);

router.post("/accept", authenticateUser, acceptFriendRequest);

router.post("/reject", authenticateUser, rejectFriendRequest);

router.get("/requests", authenticateUser, getFriendRequests);

router.get("/", authenticateUser, getFriends);

export default router;

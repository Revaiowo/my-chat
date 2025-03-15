import express from "express";
import authenticateUser from "../middleware/auth.middleware";
import { sendMessage, getMessages } from "../controllers/message.controller";

const router = express.Router();

router.post("/send/:id", authenticateUser, sendMessage);

router.get("/:id", authenticateUser, getMessages);

export default router;

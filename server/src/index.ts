import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import friendRouter from "./routes/friend.route";
import connectDB from "./database/db";
import { app, server, io } from "./lib/socket";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
	cors({
		origin: [FRONTEND_URL!],
		credentials: true,
		exposedHeaders: ["clientURL"],
	})
);

app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/friend", friendRouter);

server.listen(PORT, () => {
	connectDB(MONGO_URI!);
	console.log(`App listening on port ${PORT}`);
});

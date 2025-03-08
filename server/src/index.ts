import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";
import connectDB from "./database/db";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
		// exposedHeaders: ["clientURL"],
	})
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
	connectDB(MONGO_URI!);
	console.log(`App listening on port ${PORT}`);
});

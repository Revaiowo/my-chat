import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (userId: string, res: Response) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
};

export default generateToken;

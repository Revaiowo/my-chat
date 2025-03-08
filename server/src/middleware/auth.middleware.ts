import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import mongoose from "mongoose";

const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { token } = req.cookies;

		if (!token)
			return res.status(401).json({
				success: false,
				message: "You are not logged in.",
			});

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as JwtPayload;

		const user: IUser = await User.findOne({ _id: decoded.userId }).select(
			"-password"
		);

		req.user = user;

		next();
	} catch (error) {
		console.log("Something went wrong", error);
		let errorMessage = "Something went wrong.";

		if (error instanceof Error) errorMessage = error.message;

		res.status(500).json({
			success: false,
			message: errorMessage,
		});
	}
};

export default authenticateUser;

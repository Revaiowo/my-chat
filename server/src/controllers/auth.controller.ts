import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { IUser } from "../models/user.model";
import { userValidationSchema } from "../validation/user.validation";
import generateToken from "../lib/jwt";
import cloudinary from "../database/cloudinary";

export const userRegister = async (req: Request, res: Response) => {
	try {
		const validatedData = userValidationSchema.safeParse(req.body);

		if (!validatedData.success)
			return res.status(400).json({
				success: false,
				message: validatedData.error.issues[0].message,
			});

		const { fullName, displayName, email, password } = validatedData.data;

		let user: IUser | null = await User.findOne({ email });

		if (user)
			return res.status(400).json({
				status: false,
				message: "You are already registered.",
			});

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user = await User.create({
			fullName,
			displayName,
			email,
			password: hashedPassword,
		});

		generateToken(user._id.toString(), res);

		const { password: _, ...userWithoutPassword } = user.toObject();

		res.status(201).json({
			status: true,
			message: "User registered successfully.",
			data: userWithoutPassword,
		});
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

export const userLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user: IUser | null = await User.findOne({ email });

		if (!user)
			return res.status(401).json({
				success: false,
				message: "Incorrect email or password.",
			});

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect)
			return res.status(401).json({
				success: false,
				message: "Incorrect email or password.",
			});

		const { token } = req.cookies;

		if (token)
			return res.status(409).json({
				success: false,
				message: "You are already logged in.",
			});

		generateToken(user._id.toString(), res);

		const { password: _, ...userWithoutPassword } = user.toObject();

		res.status(200).json({
			success: true,
			message: "Logged you in!",
			data: userWithoutPassword,
		});
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

export const userLogout = async (req: Request, res: Response) => {
	try {
		res.clearCookie("token");

		res.status(200).json({
			success: true,
			message: "Logged you out.",
		});
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

export const userCheckIn = async (req: Request, res: Response) => {
	try {
		const { user } = req;
		res.status(200).json({
			success: true,
			data: user,
		});
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

export const updateProfile = async (req: Request, res: Response) => {
	try {
		const { profilePicture } = req.body;
		const { user } = req;

		console.log(profilePicture);

		if (!profilePicture)
			return res.status(400).json({
				success: false,
				message: "You need to provide a profile picture.",
			});

		const uploadResponse = await cloudinary.uploader.upload(profilePicture);
		user.profilePicture = uploadResponse.secure_url;
		await user.save();

		res.status(200).json({
			success: true,
			message: "Updated your profile picture.",
			data: user.profilePicture,
		});
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

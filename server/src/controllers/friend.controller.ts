import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";

export const sendFriendRequest = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const { user } = req;

		const requestedUser: IUser | null = await User.findOne({ email });

		if (!requestedUser)
			return res.status(404).json({
				success: false,
				message: "User with that email id does not exist.",
			});

		const requestAlreadyExists = requestedUser.friendRequests?.some(
			(id) => id.toString() === user._id.toString()
		);

		console.log(requestedUser.friends![0], user._id);

		if (requestAlreadyExists)
			return res.status(400).json({
				success: false,
				message:
					"You have already sent that user a request. Be a little patient and wait for them to accept it.",
			});

		const alreadyFriends = requestedUser.friends?.some(
			(id) => id.toString() === user._id.toString()
		);

		console.log(alreadyFriends);
		if (alreadyFriends)
			return res.status(400).json({
				success: false,
				message: "You are already friends with that user.",
			});

		requestedUser.friendRequests?.push(user._id);
		await requestedUser.save();

		res.status(200).json({
			success: true,
			message: "Sent request to that user.",
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

export const acceptFriendRequest = async (req: Request, res: Response) => {
	try {
		const { user } = req;
		const { id: requestSenderId } = req.body;

		const requestSender = await User.findOne({ _id: requestSenderId });

		if (!requestSender)
			return res.status(400).json({
				success: false,
				message: "Request sender does not exist",
			});

		const index = user.friendRequests?.findIndex(
			(id) => id.toString() === requestSenderId.toString()
		);

		if (index === -1 || index === undefined)
			return res.status(404).json({
				success: false,
				message: "Friend request not found",
			});

		user.friendRequests?.splice(index, 1);
		user.friends?.push(requestSenderId);
		requestSender.friends?.push(user._id);
		await user.save();
		await requestSender.save();

		const { password, ...userWithoutPassword } = requestSender.toObject();

		res.status(200).json({
			success: true,
			messaage: "Friend request accepted.",
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

export const rejectFriendRequest = async (req: Request, res: Response) => {
	try {
		const { user } = req;
		const { id: requestSenderId } = req.body;

		const index = user.friendRequests?.findIndex(
			(id) => id.toString() === requestSenderId.toString()
		);

		if (index === -1 || index === undefined)
			return res.status(404).json({
				success: false,
				message: "Friend request not found",
			});

		user.friendRequests?.splice(index, 1);
		await user.save();

		res.status(200).json({
			success: true,
			messaage: "Friend request rejected.",
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

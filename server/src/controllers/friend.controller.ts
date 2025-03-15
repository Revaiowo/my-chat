import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { Chat, IChat } from "../models/chat.model";

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
		const { userId: requestSenderId } = req.body;

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

		let chat: IChat | null = await Chat.findOne({
			participants: {
				$all: [user._id, requestSenderId],
			},
		}).populate("lastMessage");

		if (!chat)
			chat = await Chat.create({
				participants: [user._id, requestSenderId],
			});

		user.friendRequests?.splice(index, 1);
		user.friends?.push(requestSenderId);
		requestSender.friends?.push(user._id);

		await user.save();
		await requestSender.save();

		const { password, ...userWithoutPassword } = requestSender.toObject();

		res.status(200).json({
			success: true,
			message: "Friend request accepted.",
			data: {
				friend: userWithoutPassword,
				chat,
			},
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
		const { userId: requestSenderId } = req.body;

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
			message: "Friend request rejected.",
			data: requestSenderId,
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

export const getFriendRequests = async (req: Request, res: Response) => {
	try {
		const populatedUser = await req.user.populate("friendRequests");

		if (populatedUser.friendRequests?.length === 0)
			return res.status(200).json({
				success: true,
				message: "You don't have any pending friend requests.",
				data: [],
			});

		return res.status(200).json({
			success: true,
			message: "Successfully retrieved your friend requests.",
			data: populatedUser.friendRequests,
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

export const getFriends = async (req: Request, res: Response) => {
	try {
		const populatedUser = await req.user.populate({
			path: "friends",
			select: "-password",
		});

		if (!populatedUser.friends?.length)
			return res.status(200).json({
				success: true,
				message: "You don't have any friends.",
				data: [],
			});

		const friendIds = populatedUser.friends.map((friend) => friend._id);

		const chats: IChat[] | null = await Chat.find({
			participants: {
				$all: [req.user._id],
				$in: friendIds,
			},
		}).populate("lastMessage");

		const friendsWithChats = populatedUser.friends.map((friend) => {
			const chat = chats.find((c) =>
				c.participants.some(
					(p) => p._id.toString() === friend._id.toString()
				)
			);
			return {
				friend: friend,
				chat: chat,
			};
		});

		return res.status(200).json({
			success: true,
			message: "Successfully retrieved your friends.",
			data: friendsWithChats,
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

import { Request, Response } from "express";
import { Message, IMessage } from "../models/message.model";
import { Chat, IChat } from "../models/chat.model";
import { Types } from "mongoose";
import { getSocketId, io } from "../lib/socket";

export const sendMessage = async (req: Request, res: Response) => {
	try {
		const { text, image } = req.body;

		if (!text)
			return res.status(400).json({
				success: false,
				message: "Text field can't be empty.",
			});

		const { id: recieverId } = req.params;
		const senderId = req.user._id;

		const message: IMessage = await Message.create({
			senderId,
			recieverId,
			text,
		});

		let chat: IChat | null = await Chat.findOne({
			participants: { $all: [senderId, recieverId] },
		});

		if (!chat)
			chat = await Chat.create({
				participants: [senderId, recieverId],
				lastMessage: message._id,
			});

		message.chatId = chat._id as Types.ObjectId;
		chat.lastMessage = message._id as Types.ObjectId;
		await chat.save();
		await message.save();

		// Making a socket connection to send message
		const recieverSocketId = getSocketId(recieverId);
		if (recieverSocketId)
			io.to(recieverSocketId).emit("newMessage", message);
		console.log(recieverSocketId);

		res.status(200).json({
			success: true,
			message: "Message created.",
			data: message,
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

export const getMessages = async (req: Request, res: Response) => {
	try {
		const authorId = req.user._id;
		const { id: friendId } = req.params;

		const chat: IChat | null = await Chat.findOne({
			participants: { $all: [authorId, friendId] },
		});

		if (!chat)
			return res.status(200).json({
				success: true,
				message: "No chat found between the users.",
				data: [],
			});

		const messages = await Message.find({ chatId: chat._id }).sort({
			createdAt: 1,
		});

		res.status(200).json({
			success: true,
			message: "All chat messages recovered",
			data: messages,
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

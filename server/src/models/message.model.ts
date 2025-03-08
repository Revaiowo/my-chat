import mongoose, { Types, Document, mongo } from "mongoose";

export interface IMessage extends Document {
	chatId?: Types.ObjectId;
	senderId: Types.ObjectId;
	recieverId: Types.ObjectId;
	text?: string;
	image?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const messageSchema = new mongoose.Schema<IMessage>(
	{
		chatId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
		},

		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		recieverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		text: {
			type: String,
			default: "",
		},

		image: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);

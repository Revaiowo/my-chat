import mongoose, { Types, Document } from "mongoose";

export interface IChat extends Document {
	participants: Types.ObjectId[];
	lastMessage: Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
}

const chatSchema = new mongoose.Schema<IChat>(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
		],

		lastMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
			required: true,
		},
	},
	{ timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);

import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
	_id: Types.ObjectId;
	email: string;
	fullName: string;
	displayName: string;
	password: string;
	profilePicture?: string;
	friends?: Types.ObjectId[];
	friendRequests?: Types.ObjectId[];
	createdAt?: Date;
	updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},

		fullName: {
			type: String,
			required: true,
		},

		displayName: {
			type: String,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},

		profilePicture: {
			type: String,
			default: "",
		},

		friends: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],

		friendRequests: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;

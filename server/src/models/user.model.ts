import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
	_id: Types.ObjectId;
	email: string;
	fullName: string;
	displayName: string;
	password: string;
	profilePicture?: string;
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
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;

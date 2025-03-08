export interface IUser {
	_id: string;
	email: string;
	fullName: string;
	displayName: string;
	password: string;
	profilePicture: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IMessage {
	_id: string;
	chatId: string;
	senderId: string;
	recieverId: string;
	text: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IChat {
	_id: string;
	participants: IUser[];
	lastMessage: IMessage;
	createdAt: Date;
	updatedAt: Date;
}

export interface SelectedUserProp {
	selectedUser: IUser | null;
	setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

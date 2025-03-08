import { IMessage, IUser } from "@/lib/types";
import { create } from "zustand";

interface IUserStore {
	selectedUser: IUser | null;
	setSelectedUser: (user: IUser) => void;
}

interface IMessageStore {
	messages: IMessage[];
	setMessages: (newMessage: IMessage | IMessage[]) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
	selectedUser: null,
	setSelectedUser: (user) => set({ selectedUser: user }),
}));

export const useMessageStore = create<IMessageStore>((set) => ({
	messages: [],
	setMessages: (newMessages) =>
		set(() => ({
			messages: [
				...(Array.isArray(newMessages) ? newMessages : [newMessages]),
			],
		})),
}));

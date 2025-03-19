import { IMessage, IUser } from "@/lib/types";
import { create } from "zustand";
import { useSocketStore } from "./socketStore";

interface IUserStore {
	selectedUser: IUser | null;
	setSelectedUser: (user: IUser | null) => void;
	isChatOpen: boolean;
	setIsChatOpen: () => void;
}

interface IMessageStore {
	messages: IMessage[];
	setMessages: (newMessage: IMessage | IMessage[]) => void;
	subscribeToMessage: () => void;
	unsubscribeFromMessage: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
	selectedUser: null,

	setSelectedUser: (user) => set({ selectedUser: user }),

	isChatOpen: false,

	setIsChatOpen: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));

export const useMessageStore = create<IMessageStore>((set, get) => ({
	messages: [],

	setMessages: (newMessages) =>
		set((state) => ({
			messages: Array.isArray(newMessages)
				? newMessages
				: [...state.messages, newMessages],
		})),

	subscribeToMessage: () => {
		const selectedUser = useUserStore.getState().selectedUser;
		const socket = useSocketStore.getState().socket;

		if (socket && selectedUser) {
			socket.off("newMessage");

			socket.on("newMessage", (newMessage) => {
				if (selectedUser._id !== newMessage.senderId) return;

				set((state) => ({
					messages: [...state.messages, newMessage],
				}));
			});
		}
	},

	unsubscribeFromMessage: () => {
		const socket = useSocketStore.getState().socket;
		if (socket) socket.off("newMessage");
	},
}));

import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface ISocketStore {
	socket: Socket | null;
	socketOnlineUsers: string[];
	connectSocket: (userId: string) => void;
	disconnectSocket: () => void;
}

export const useSocketStore = create<ISocketStore>((set, get) => ({
	socket: null,

	socketOnlineUsers: [],

	connectSocket: (userId) => {
		if (get().socket?.connected) return;

		const socket = io("http://localhost:5000", {
			transports: ["websocket", "polling"],
			query: {
				userId,
			},
		});

		socket.connect();
		set({ socket: socket });

		socket.on("getOnlineUsers", ({ userIds }: { userIds: string[] }) => {
			set({ socketOnlineUsers: userIds });
		});
	},

	disconnectSocket: () => {
		const socket = get().socket;

		if (socket?.connected) {
			socket.disconnect();
			set({ socket: null });
		}
	},
}));

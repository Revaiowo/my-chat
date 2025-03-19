import { IChat, IUser } from "@/lib/types";
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

interface IFriendStore {
	friends: {
		friend: IUser;
		chat: IChat | null;
	}[];
	friendRequests: IUser[];
	setFriends: (
		newFriend:
			| { friend: IUser; chat: IChat | null }
			| { friend: IUser; chat: IChat | null }[]
	) => void;
	setFriendRequests: (users: IUser[]) => void;
	sendFriendRequest: (email: string) => void;
	acceptFriendRequest: (userId: string) => void;
	rejectFriendRequest: (userId: string) => void;
	getFriendRequests: () => void;
	getFriends: () => void;
}

export const useFriendStore = create<IFriendStore>((set, get) => ({
	friends: [],

	friendRequests: [],

	setFriends: (newFriend) =>
		set((state) => ({
			friends: Array.isArray(newFriend)
				? newFriend
				: [
						...state.friends,
						{ friend: newFriend.friend, chat: newFriend.chat },
				  ],
		})),

	setFriendRequests: (users) => set({ friendRequests: users }),

	sendFriendRequest: async (email) => {
		try {
			const res = await axios.post(
				"/api/friend/send",
				{ email },
				{ withCredentials: true }
			);

			toast.success(res.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	},

	acceptFriendRequest: async (userId) => {
		try {
			const res = await axios.post(
				"/api/friend/accept",
				{ userId },
				{ withCredentials: true }
			);

			get().setFriends(res.data.data);
			set({
				friendRequests: get().friendRequests.filter(
					(request) => request._id !== userId
				),
			});
			toast.success(res.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	},

	rejectFriendRequest: async (userId) => {
		try {
			const res = await axios.post(
				"/api/friend/reject",
				{ userId },
				{ withCredentials: true }
			);

			set({
				friendRequests: get().friendRequests.filter(
					(request) => request._id !== userId
				),
			});
			toast.success(res.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	},

	getFriendRequests: async () => {
		try {
			const res = await axios.get("/api/friend/requests", {
				withCredentials: true,
			});

			get().setFriendRequests(res.data.data);
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	},

	getFriends: async () => {
		try {
			const res = await axios.get("/api/friend", {
				withCredentials: true,
			});

			get().setFriends(res.data.data);
		} catch (error: any) {
			console.log(error);
		}
	},
}));

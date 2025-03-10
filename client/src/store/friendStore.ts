import { IUser } from "@/lib/types";
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { totalmem } from "os";

interface IFriendStore {
	friends: IUser[];

	setFriends: (user: IUser) => void;

	sendFriendRequest: (email: string) => void;

	acceptFriendRequest: (userId: string) => void;

	rejectFriendRequest: (userId: string) => void;
}

export const useFriendStore = create<IFriendStore>((set, get) => ({
	friends: [],

	setFriends: (user) =>
		set((state) => ({
			friends: [...state.friends, user],
		})),

	sendFriendRequest: async (email) => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/friend/send",
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
				"http://localhost:5000/api/friend/accept",
				{ userId },
				{ withCredentials: true }
			);

			get().setFriends(res.data.data);
			toast.success(res.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	},

	rejectFriendRequest: async (userId) => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/friend/reject",
				{ userId },
				{ withCredentials: true }
			);

			toast.success(res.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	},
}));

"use client";

import { useSocketStore } from "@/store/socketStore";
import axios from "axios";
import {
	createContext,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";

interface IUser {
	_id: string;
	fullName: string;
	displayName: string;
	email: string;
	profilePicture: string;
	createdAt: Date;
	updatedAt: Date;
}

interface IUserContext {
	user: IUser | null;
	setUser: Dispatch<SetStateAction<IUser | null>> | null;
	isLoading: true | false;
	setIsLoading: Dispatch<SetStateAction<true | false>>;
}

export const UserContext = createContext<IUserContext | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const connectSocket = useSocketStore((state) => state.connectSocket);
	const disconnectSocket = useSocketStore((state) => state.disconnectSocket);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/auth/checkIn",
					{ withCredentials: true }
				);
				setUser(res.data.data);
			} catch (error: any) {
				setUser(null);
				console.log("my user error - ", error.response.data);
			} finally {
				setIsLoading(false);
			}
		};
		getUser();
	}, []);

	useEffect(() => {
		if (user) connectSocket(user?._id as string);

		return () => {
			disconnectSocket();
		};
	}, [user]);

	return (
		<UserContext.Provider
			value={{ user, setUser, isLoading, setIsLoading }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;

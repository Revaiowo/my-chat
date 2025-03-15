"use client";

import Chat from "./Chat";
import { useContext } from "react";
import Header from "./Header";
import Input from "./Input";
import { UserContext } from "@/Context/userContext";
import MainNoLogin from "./MainNoLogin";
import { Loader } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useUserStore } from "@/store/userStore";
import { Button } from "./ui/button";
import AddFriendsDialog from "./AddFriendsDialog";

function Main() {
	const userContext = useContext(UserContext);
	const user = userContext?.user;
	const selectedUser = useUserStore((state) => state.selectedUser);
	const isLoading = userContext?.isLoading;

	if (isLoading) {
		return (
			<div className="w-[70%] h-full bg-[#131313] flex flex-col gap-10 p-10">
				{/* <Loader className="loader" /> */}
				<Skeleton className="w-full h-[15%] rounded-xl" />
				<Skeleton className="w-full h-[70%] rounded-xl" />
				<Skeleton className="w-full h-[15%] rounded-xl" />
			</div>
		);
	}

	if (!selectedUser) {
		return (
			<div className="w-[70%] h-full bg-[#131313] flex flex-col gap-5 justify-center items-center">
				<div className="text-4xl">Add friends and start chatting!</div>
				<AddFriendsDialog>
					<Button className="min-w-[200px]">Add Friends</Button>
				</AddFriendsDialog>
			</div>
		);
	}

	return (
		<>
			{user ? (
				<div className="w-full bg-[#131313] flex flex-col">
					<Header />
					<Chat />
					<Input />
				</div>
			) : (
				<div className="w-[70%] bg-[#131313] flex justify-center items-center">
					<MainNoLogin />
				</div>
			)}
		</>
	);
}

export default Main;

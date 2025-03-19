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
import AddFriendsDialog from "./dialog/AddFriendsDialog";
import FriendList from "./FriendList";

function Main() {
	const userContext = useContext(UserContext);
	const user = userContext?.user;
	const selectedUser = useUserStore((state) => state.selectedUser);
	const isChatOpen = useUserStore((state) => state.isChatOpen);
	const isLoading = userContext?.isLoading;

	console.log(isChatOpen);

	if (isLoading) {
		return (
			<div className="w-full h-full bg-[#131313] flex flex-col gap-10 p-10">
				{/* <Loader className="loader" /> */}
				<Skeleton className="w-full h-[15%] rounded-xl" />
				<Skeleton className="w-full h-[70%] rounded-xl" />
				<Skeleton className="w-full h-[15%] rounded-xl" />
			</div>
		);
	}

	if (!selectedUser && user) {
		return (
			<>
				<div className="sm:hidden flex flex-col gap-10 pt-10 pb-5 w-full h-full bg-[#131313] ">
					<div className="self-center text-lg p-2 relative after:w-full after:border after:absolute after:bottom-2 after:left-0">
						FRIENDS LIST
					</div>
					<div className="overflow-y-auto h-full custom-scrollbar">
						<FriendList />
					</div>
				</div>

				<div className="hidden w-full h-full bg-[#131313] sm:flex flex-col gap-5 justify-center items-center p-10 sm:p-5">
					<div className="text-4xl text-center">
						Add friends and start chatting!
					</div>
					<AddFriendsDialog>
						<Button className="min-w-[200px]">Add Friends</Button>
					</AddFriendsDialog>
				</div>
			</>
		);
	}

	return (
		<>
			{user ? (
				<>
					<div className="w-full bg-[#131313] flex flex-col">
						<Header />
						<Chat />
						<Input />
					</div>
				</>
			) : (
				<div className="w-full bg-[#131313] flex justify-center items-center">
					<MainNoLogin />
				</div>
			)}
		</>
	);
}

export default Main;

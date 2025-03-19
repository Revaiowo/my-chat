"use client";

import Image from "next/image";
import FriendList from "./FriendList";
import SidebarHeader from "./SidebarHeader";
import { CirclePlus, MessageSquareText } from "lucide-react";
import AddFriendsDialog from "./dialog/AddFriendsDialog";
import { useUserStore } from "@/store/userStore";

function Sidebar() {
	const setSelectedUser = useUserStore((state) => state.setSelectedUser);
	return (
		<div className="w-[50px] sm:w-[600px] h-full bg-[#1a1a1a] flex flex-col justify-between">
			<div className="hidden sm:block">
				<SidebarHeader />
			</div>

			<div className="p-4 flex justify-between">
				<div className="hidden sm:flex 	flex-1">
					<Image
						className="bg-[#2b2b2b] rounded-l-3xl pl-2"
						alt="search"
						src="/search.svg"
						width={30}
						height={30}
					/>
					<input
						className="bg-[#2b2b2b] rounded-r-3xl w-[80%] p-2  text-xs outline-none"
						placeholder="Search"
					/>
				</div>
				<div className="flex flex-col gap-2 justify-center items-center">
					<MessageSquareText
						className="sm:hidden"
						onClick={() => setSelectedUser(null)}
					/>
					<AddFriendsDialog>
						<CirclePlus
							size={25}
							className="hover:cursor-pointer"
						/>
					</AddFriendsDialog>
				</div>
			</div>

			{/* Third Part */}
			<div className="hidden h-full sm:flex-1 sm:flex sm:flex-col">
				<div className="self-center text-lg p-2 relative after:w-full after:border after:absolute after:bottom-2 after:left-0">
					FRIENDS LIST
				</div>
				<div className="overflow-y-auto h-[300px] custom-scrollbar">
					<FriendList />
				</div>
			</div>

			<div className="sm:hidden">
				<SidebarHeader />
			</div>
		</div>
	);
}

export default Sidebar;

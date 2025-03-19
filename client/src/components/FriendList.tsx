"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useMessageStore, useUserStore } from "@/store/userStore";
import { UserContext } from "@/Context/userContext";
import { useFriendStore } from "@/store/friendStore";
import AddFriendsDialog from "./dialog/AddFriendsDialog";
import { Button } from "./ui/button";

const formatTime = (timestamp: Date): string => {
	const date = new Date(timestamp);
	return date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
};

function FriendList() {
	const userContext = useContext(UserContext);
	const user = userContext?.user;

	const selectedUser = useUserStore((state) => state.selectedUser);
	const setSelectedUser = useUserStore((state) => state.setSelectedUser);

	const messages = useMessageStore((state) => state.messages);

	const getFriends = useFriendStore((state) => state.getFriends);
	const friends = useFriendStore((state) => state.friends);

	useEffect(() => {
		getFriends();
	}, [messages]);

	if (friends.length == 0) {
		return (
			<div className="w-full h-full bg-inherit flex flex-col gap-5 justify-center items-center p-5">
				<div className=" text-2xl text-center">No friends found!</div>
				<AddFriendsDialog>
					<Button className="sm:hidden min-w-[200px]">
						Add Friends
					</Button>
				</AddFriendsDialog>
			</div>
		);
	}

	return (
		<>
			{user &&
				friends.map((f) => (
					<div
						key={f.friend._id}
						onClick={() => {
							setSelectedUser(f.friend);
						}}
						className={`flex h-16 items-center p-4 justify-between border-b border-[#373737] hover:cursor-pointer hover:bg-[#2b2b2b]
							${f.friend._id === selectedUser?._id ? "bg-[#2b2b2b]" : ""}
							`}
					>
						<div className="flex gap-4 items-center">
							<div className="h-10 w-10 rounded-full relative bg-[#474747] overflow-hidden">
								<Image
									alt="display"
									src={
										f.friend.profilePicture || "/avatar.png"
									}
									fill={true}
									objectFit="cover"
								/>
							</div>
							<div>
								<div className="text-2xl">
									{f.friend.fullName}
								</div>
								<div className="text-sm  font-light">
									{f.chat && f.chat.lastMessage?.text}
								</div>
							</div>
						</div>
						<div>{f.chat && formatTime(f.chat.updatedAt)}</div>
					</div>
				))}
		</>
	);
}

export default FriendList;

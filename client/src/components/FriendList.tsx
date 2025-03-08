"use client";

import choso from "@/assets/choso.png";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IChat } from "@/lib/types";
import { useMessageStore, useUserStore } from "@/store/userStore";

const formatTime = (timestamp: Date): string => {
	const date = new Date(timestamp);
	return date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
};

function FriendList() {
	const [friendList, setFriendList] = useState<IChat[]>([]);

	const selectedUser = useUserStore((state) => state.selectedUser);
	const setSelectedUser = useUserStore((state) => state.setSelectedUser);

	const messages = useMessageStore((state) => state.messages);

	useEffect(() => {
		const getFriendList = async () => {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/message/user/sidebar",
					{ withCredentials: true }
				);
				setFriendList(res.data.data);
			} catch (error: any) {
				console.log("Error getting Friend list:", error.response?.data);
			}
		};
		getFriendList();
	}, [messages]);

	return (
		<>
			{typeof window !== "undefined" &&
				friendList.map((friend) => (
					<div
						key={friend._id}
						onClick={() => {
							setSelectedUser(friend.participants[0]);
						}}
						className={`flex h-16 items-center p-4 justify-between border-b border-[#373737] hover:cursor-pointer hover:bg-[#2b2b2b]
							${friend.participants[0]._id === selectedUser?._id ? "bg-[#2b2b2b]" : ""}
							`}
					>
						<div className="flex gap-4 items-center">
							<div className="h-10 w-10 rounded-full bg-red-300">
								<Image
									alt="display"
									src={choso}
									objectFit="cover"
								/>
							</div>
							<div>
								<div className="text-2xl">
									{friend.participants[0].fullName}
								</div>
								<div className="text-sm  font-light">
									{friend.lastMessage.text}
								</div>
							</div>
						</div>
						<div>{formatTime(friend.updatedAt)}</div>
					</div>
				))}
		</>
	);
}

export default FriendList;

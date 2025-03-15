"use client";

import axios from "axios";
import Image from "next/image";
import choso from "@/assets/choso.png";
import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "@/Context/userContext";
import { useMessageStore, useUserStore } from "@/store/userStore";

const formatTime = (timestamp: Date): string => {
	const date = new Date(timestamp);
	return date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
};

function Chat() {
	const userContext = useContext(UserContext);
	const user = userContext?.user;

	const selectedUser = useUserStore((state) => state.selectedUser);

	const {
		messages,
		setMessages,
		subscribeToMessage,
		unsubscribeFromMessage,
	} = useMessageStore();

	const chatBoxRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (chatBoxRef.current && messages.length > 0) {
			chatBoxRef.current.scrollTo({
				top: chatBoxRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [messages]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get(
					`http://localhost:5000/api/message/${selectedUser?._id}`,
					{ withCredentials: true }
				);
				// returns an array
				setMessages(res.data.data);
				subscribeToMessage();

				return () => unsubscribeFromMessage();
			} catch (error: any) {
				console.log("my user error - ", error.response.data);
			}
		};
		if (selectedUser) getMessages();
	}, [selectedUser, subscribeToMessage, unsubscribeFromMessage]);

	return (
		<>
			<div
				ref={chatBoxRef}
				className="h-[70%] px-10 py-5 overflow-y-auto custom-scrollbar"
			>
				{typeof window !== "undefined" &&
					messages.map((message) => (
						<div
							// ref={chatBoxRef}
							key={message._id}
							className={`flex mb-3 gap-3 ${
								message.senderId === user?._id
									? "justify-end"
									: ""
							}`}
						>
							{message.senderId !== user?._id && (
								<div className="relative w-10 h-10 rounded-full self-end overflow-hidden">
									<Image
										alt="display"
										src={
											selectedUser?.profilePicture ||
											"/avatar.png"
										}
										fill={true}
										objectFit="cover"
									/>
								</div>
							)}
							<div
								className={`bg-[#5f36b2] p-3 rounded-t-xl  min-w-[150px] max-w-[500px] flex flex-col gap-3 ${
									message.senderId === user?._id
										? "rounded-l-xl"
										: "rounded-r-xl"
								} `}
							>
								<div className="flex justify-between text-xs gap-5">
									{message.senderId === user?._id ? (
										<div>{user?.fullName}</div>
									) : (
										<div>{selectedUser?.fullName}</div>
									)}
									<div>{formatTime(message.createdAt)}</div>
								</div>
								<div className="">{message.text}</div>
							</div>

							{message.senderId === user?._id && (
								<div className="relative w-10 h-10 rounded-full bg-[#474747] self-end overflow-hidden">
									<Image
										alt="display"
										src={
											user.profilePicture || "/avatar.png"
										}
										fill={true}
										objectFit="cover"
									/>
								</div>
							)}
						</div>
					))}
			</div>
		</>
	);
}

export default Chat;

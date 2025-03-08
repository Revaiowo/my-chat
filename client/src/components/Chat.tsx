"use client";

import axios from "axios";
import Image from "next/image";
import choso from "@/assets/choso.png";
import React, { useContext, useEffect } from "react";
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

	const messages = useMessageStore((state) => state.messages);
	const setMessages = useMessageStore((state) => state.setMessages);

	const selectedUser = useUserStore((state) => state.selectedUser);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get(
					`http://localhost:5000/api/message/${selectedUser?._id}`,
					{ withCredentials: true }
				);
				setMessages(res.data.data);
			} catch (error: any) {
				console.log("my user error - ", error.response.data);
			}
		};
		if (selectedUser) getMessages();
	}, [selectedUser]);

	return (
		<>
			{typeof window !== "undefined" &&
				messages.map((message) => (
					<div
						key={message._id}
						className={`flex mb-3 gap-3 ${
							message.senderId === user?._id ? "justify-end" : ""
						}`}
					>
						{message.senderId !== user?._id && (
							<div className="w-10 h-10 rounded-full bg-[#ee8686] self-end">
								<Image
									alt="display"
									src={choso}
									objectFit="fill"
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
							<div className="flex justify-between text-xs">
								{message.senderId === user?._id ? (
									<div>{user?.fullName}</div>
								) : (
									<div>John Cena</div>
								)}
								<div>{formatTime(message.createdAt)}</div>
							</div>
							<div className="">{message.text}</div>
						</div>

						{message.senderId === user?._id && (
							<div className="w-10 h-10 rounded-full bg-[#ee8686] self-end">
								<Image
									alt="display"
									src={choso}
									objectFit="fill"
								/>
							</div>
						)}
					</div>
				))}
		</>
	);
}

export default Chat;

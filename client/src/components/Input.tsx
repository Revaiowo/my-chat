"use client";

import Image from "next/image";
import axios from "axios";
import React, { useState } from "react";
import { useMessageStore, useUserStore } from "@/store/userStore";

function Input() {
	const [inputMessage, setInputMessage] = useState("");
	const setMessages = useMessageStore((state) => state.setMessages);

	const selectedUser = useUserStore((state) => state.selectedUser);

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		try {
			const res = await axios.post(
				`/api/message/send/${selectedUser?._id}`,
				{ text: inputMessage },
				{ withCredentials: true }
			);

			setMessages(res.data.data);
			setInputMessage("");
		} catch (error: any) {
			console.log("Error sending message:", error.response?.data);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevent default behavior (e.g., new line in a textarea)
			handleSendMessage(); // Call the send message function
		}
	};
	return (
		<div className="h-[15%] px-10 py-3 flex justify-between items-center gap-5">
			<div className="flex bg-[#2b2b2b] p-3 gap-1 flex-1 self-stretch rounded-xl">
				<Image
					className="hover:cursor-pointer"
					alt="emoji"
					src="/emoji.svg"
					width={30}
					height={30}
				/>
				<input
					className="bg-[#2b2b2b] w-full outline-none p-3"
					placeholder="Type a messaage"
					type="text"
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<Image
					className="hover:cursor-pointer"
					alt="attach"
					src="/attach.svg"
					width={30}
					height={30}
				/>
			</div>

			<div className="bg-gradient-to-r from-[#f36b70] to-[#e24694] rounded-full border-8 border-[rgb(28,23,28)] border-opacity-70 hover:cursor-pointer hover:brightness-90">
				<Image
					className="p-2.5"
					alt="send"
					src="/send.svg"
					width={50}
					height={50}
					onClick={handleSendMessage}
				/>
			</div>
		</div>
	);
}

export default Input;

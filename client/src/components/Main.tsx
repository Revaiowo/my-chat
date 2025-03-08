"use client";

import Chat from "./Chat";
import { useEffect, useRef } from "react";
import { useMessageStore } from "@/store/userStore";
import Header from "./Header";
import Input from "./Input";

function Main() {
	const chatBoxRef = useRef<HTMLDivElement>(null);

	const messages = useMessageStore((state) => state.messages);

	useEffect(() => {
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="w-[70%] bg-[#131313] flex flex-col">
			<Header />

			<div
				ref={chatBoxRef}
				className="h-[70%] px-10 py-5 overflow-y-auto custom-scrollbar"
			>
				<Chat />
			</div>

			<Input />
		</div>
	);
}

export default Main;

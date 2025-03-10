"use client";

import Chat from "./Chat";
import { useContext } from "react";
import Header from "./Header";
import Input from "./Input";
import { UserContext } from "@/Context/userContext";

function Main() {
	const userContext = useContext(UserContext);
	const user = userContext?.user;

	return (
		<>
			{user ? (
				<div className="w-[70%] bg-[#131313] flex flex-col">
					<Header />
					<Chat />
					<Input />
				</div>
			) : (
				<div>Hello</div>
			)}
		</>
	);
}

export default Main;

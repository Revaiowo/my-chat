"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import choso from "@/assets/choso.png";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/Context/userContext";
import { Settings } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSocketStore } from "@/store/socketStore";
import AddFriendsDialog from "./AddFriendsDialog";

function SidebarHeader() {
	const [isOpen, setIsOpen] = useState(false);

	const userContext = useContext(UserContext);
	const user = userContext?.user;
	const setUser = userContext?.setUser!;

	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setIsOpen(false);
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	const disconnectSocket = useSocketStore((state) => state.disconnectSocket);

	const handleLogout = async () => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/auth/logout",
				{},
				{ withCredentials: true }
			);

			if (user) setUser(null);
			disconnectSocket();

			toast.success(res.data.message);
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	};

	const handleFriendRequest = () => {};

	return (
		<div className="p-4 flex items-center justify-between border-b border-[#494949]">
			<div className="flex gap-3 items-center">
				<div className="rounded-full h-11 w-11 bg-slate-500">
					<Image alt="Display" src={choso} objectFit="cover" />
				</div>
				<div className="font-medium text-xl">
					{user ? user?.fullName : "Anon"}
				</div>
			</div>

			<div className="relative" ref={menuRef}>
				<button
					className="outline-none"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					<Settings
						size={25}
						className={`hover:cursor-pointer transition-transform duration-300 ${
							isOpen ? "rotate-180" : "rotate-0"
						}`}
					/>
				</button>

				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.95 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="min-w-40 z-10 h-auto bg-[#363636] absolute right-0 mt-2 shadow-lg rounded-lg"
					>
						<ul className="py-3">
							<li className="py-2 px-5 hover:cursor-pointer hover:bg-[#7c7c7c]">
								Change Profile
							</li>
							<li className="py-2 px-5 hover:cursor-pointer w-full hover:bg-[#7c7c7c]">
								<AddFriendsDialog>Add Friends</AddFriendsDialog>
							</li>
							<li className="py-2 px-5 hover:cursor-pointer hover:bg-[#7c7c7c]">
								Friend Request
							</li>
							<li className="py-2 px-5 border-t border-[#585858] hover:cursor-pointer hover:bg-[#7c7c7c]">
								<div onClick={handleLogout}>Logout</div>
							</li>
						</ul>
					</motion.div>
				)}
			</div>
		</div>
	);
}

export default SidebarHeader;

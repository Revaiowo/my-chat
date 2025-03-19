"use client";

import Image from "next/image";
import choso from "@/assets/choso.png";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/Context/userContext";
import { Settings } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSocketStore } from "@/store/socketStore";
import AddFriendsDialog from "./dialog/AddFriendsDialog";
import FriendRequestDialog from "./dialog/FriendRequestDialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfilePictureDialog from "./dialog/ProfilePictureDialog";

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
			setIsOpen(false);
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	};

	return (
		<div className="p-4 flex flex-col gap-2 sm:flex-row items-center justify-between border-b border-[#494949]">
			<div className="flex gap-3 items-center">
				<div className="rounded-full h-8 w-8 sm:h-11 sm:w-11 relative bg-[#474747] overflow-hidden">
					<Image
						alt="Display"
						src={user?.profilePicture || "/avatar.png"}
						fill={true}
						objectFit="cover"
					/>
				</div>
				<div className="hidden sm:block font-medium text-3xl">
					{user ? user?.fullName : "Anon"}
				</div>
			</div>

			<div className="relative  focus:outline-none" ref={menuRef}>
				<DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
					<DropdownMenuTrigger>
						<Settings
							style={{ outline: "none" }}
							size={25}
							className={`settings-icon hover:cursor-pointer transition-transform duration-300 outline-none border-none focus:outline-none ${
								isOpen ? "rotate-180" : "rotate-0"
							}`}
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="min-w-[200px] py-3 mt-2 bg-[#242424]">
						<ProfilePictureDialog>
							<DropdownMenuItem
								className="text-xl hover:cursor-pointer focus:bg-[#696969]"
								onSelect={(e) => e.preventDefault()}
							>
								<span>Profile</span>
							</DropdownMenuItem>
						</ProfilePictureDialog>

						<AddFriendsDialog>
							<DropdownMenuItem
								className="text-xl w-full hover:cursor-pointer focus:bg-[#696969]"
								onSelect={(e) => e.preventDefault()}
							>
								<div>Add Friends</div>
							</DropdownMenuItem>
						</AddFriendsDialog>

						<FriendRequestDialog>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
								className="text-xl hover:cursor-pointer focus:bg-[#696969]"
							>
								<span>Friend Request</span>
							</DropdownMenuItem>
						</FriendRequestDialog>

						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="text-xl hover:cursor-pointer focus:bg-[#696969]"
							onClick={handleLogout}
						>
							<span>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}

export default SidebarHeader;

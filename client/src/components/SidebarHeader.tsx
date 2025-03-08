"use client";

import Image from "next/image";
import choso from "@/assets/choso.png";
import { useContext } from "react";
import { UserContext } from "@/Context/userContext";

function SidebarHeader() {
	const userContext = useContext(UserContext);
	const user = userContext?.user;
	return (
		<div className="p-4 flex items-center justify-between">
			<div className="flex gap-3 items-center">
				<div className="rounded-full h-11 w-11 bg-slate-500">
					<Image alt="Display" src={choso} objectFit="cover" />
				</div>
				<div className="font-medium text-xl">{user?.fullName}</div>
			</div>
			<Image
				className="cursor-pointer"
				alt="Setting"
				src="/settings.svg"
				width={25}
				height={25}
			/>
		</div>
	);
}

export default SidebarHeader;

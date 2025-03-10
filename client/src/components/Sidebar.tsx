import Image from "next/image";
import FriendList from "./FriendList";
import SidebarHeader from "./SidebarHeader";
import { CirclePlus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AddFriendsDialog from "./AddFriendsDialog";

function Sidebar() {
	return (
		<div className="w-[30%] h-full bg-[#1a1a1a] flex flex-col">
			<SidebarHeader />

			<div className="p-4 flex justify-between">
				<div className="flex flex-1">
					<Image
						className="bg-[#2b2b2b] rounded-l-3xl pl-2"
						alt="search"
						src="/search.svg"
						width={30}
						height={30}
					/>
					<input
						className="bg-[#2b2b2b] rounded-r-3xl w-[80%] p-2  text-xs outline-none"
						placeholder="Search"
					/>
				</div>
				<AddFriendsDialog>
					<CirclePlus size={25} className="hover:cursor-pointer" />
				</AddFriendsDialog>
			</div>

			{/* Third Part */}
			<div className="flex-1 flex flex-col">
				<div className="self-center text-lg p-2 relative after:w-full after:border after:absolute after:bottom-2 after:left-0">
					FRIENDS LIST
				</div>
				<div className="overflow-y-auto h-[450px] custom-scrollbar">
					<FriendList />
				</div>
			</div>
		</div>
	);
}

export default Sidebar;

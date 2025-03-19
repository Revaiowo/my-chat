import React from "react";
import { Button } from "./ui/button";
import { MessageCircleMore, X } from "lucide-react";
import { useRouter } from "next/navigation";
import AddFriendsDialog from "./dialog/AddFriendsDialog";

function MainNoLogin() {
	const router = useRouter();

	return (
		<div className="flex flex-col gap-8  border-green-400 w-[350px]">
			<div className="flex gap-5  border-white mb-5">
				<div className="text-7xl">myChat</div>
				<MessageCircleMore className="custom-bounce" size={70} />
			</div>
			<div className="flex gap-5 items-center">
				<Button
					onClick={() => router.push("/register")}
					className="w-[50%]"
				>
					Register
				</Button>
				<div>or</div>
				<Button
					onClick={() => router.push("/login")}
					className="w-[50%]"
				>
					Login
				</Button>
			</div>

			<div className="flex items-center w-full">
				<div className="flex-grow h-px bg-gray-300"></div>
				<X className="px-1" />
				<div className="flex-grow h-px bg-gray-300"></div>
			</div>

			<div className="">
				Wanna stay anonymous? Click on the button below to chat to other
				anonymous users.
			</div>
			<AddFriendsDialog>
				<Button className="w-full outline-none border-none">
					Add anonymous users
				</Button>
			</AddFriendsDialog>
		</div>
	);
}

export default MainNoLogin;

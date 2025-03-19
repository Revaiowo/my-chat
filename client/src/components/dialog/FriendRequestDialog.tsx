"use client";

import React, { useContext, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import choso from "@/assets/choso.png";
import { useFriendStore } from "@/store/friendStore";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { UserContext } from "@/Context/userContext";

function FriendRequestDialog({ children }: { children: React.ReactNode }) {
	const userContext = useContext(UserContext);
	const user = userContext?.user;

	const {
		friendRequests,
		getFriendRequests,
		acceptFriendRequest,
		rejectFriendRequest,
	} = useFriendStore();

	useEffect(() => {
		if (user) getFriendRequests();
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Friend Requests</DialogTitle>
					<DialogDescription>
						List of your pening friend requests.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-5 max-h-[400px] overflow-y-auto custom-scrollbar p-5 ">
					{friendRequests.length ? (
						friendRequests.map((friendRequest) => (
							<div key={friendRequest._id}>
								<div className="py-2 px-3 border border-[#474747] rounded-lg flex items-center justify-between">
									<div className="flex gap-3 items-center">
										<div className="rounded-full h-10 w-10 bg-slate-500">
											<Image
												alt="Display"
												src={choso}
												objectFit="cover"
											/>
										</div>
										<div className="text-xl">
											{friendRequest.fullName}
										</div>
									</div>

									<div className="flex gap-3 items-center">
										<Check
											onClick={() =>
												acceptFriendRequest(
													friendRequest._id
												)
											}
											className="bg-[#80d591] rounded-full hover:cursor-pointer"
										/>
										<X
											onClick={() =>
												rejectFriendRequest(
													friendRequest._id
												)
											}
											className="bg-red-400 rounded-full hover:cursor-pointer"
										/>
									</div>
								</div>
							</div>
						))
					) : (
						<div>No friend requests found.</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default FriendRequestDialog;

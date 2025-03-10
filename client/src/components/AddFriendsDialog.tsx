"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useFriendStore } from "@/store/friendStore";

function AddFriendsDialog({ children }: { children: React.ReactNode }) {
	const [email, setEmail] = useState("");
	const [userId, setUserId] = useState("");

	const sendFriendRequest = useFriendStore(
		(state) => state.sendFriendRequest
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!email && !userId)
			return toast.error("Fill either one of the fields");

		if (email && userId)
			return toast.error("You can not fill both the fields");

		if (email) sendFriendRequest(email);

		setEmail("");
		setUserId("");
	};
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className="flex flex-col">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Add Friends</DialogTitle>
						<DialogDescription>
							Only fill one of the fields
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-right">
								Email
							</Label>
							<Input
								id="email"
								value={email}
								placeholder="Enter email of registered user"
								className="col-span-3"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="userId" className="text-right">
								User Id
							</Label>
							<Input
								id="userId"
								value={userId}
								placeholder="Request user id from an anonymous user"
								className="col-span-3"
								onChange={(e) => setUserId(e.target.value)}
							/>
						</div>
					</div>
					<DialogFooter className="flex">
						<Button type="submit">Add</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default AddFriendsDialog;

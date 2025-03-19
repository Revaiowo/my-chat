"use client";

import React, { useContext, useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { UserContext } from "@/Context/userContext";
import { Camera, Loader, Mail, User } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function ProfilePictureDialog({ children }: { children: React.ReactNode }) {
	const userContext = useContext(UserContext);
	const user = userContext?.user;
	const setUser = userContext?.setUser!;

	const [isLoading, setIsLoading] = useState(false);
	const [profilePicture, setProfilePicture] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];

		if (!file) return;

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = async () => {
			try {
				setIsLoading(true);
				const base64Image = reader.result as string;
				setProfilePicture(base64Image);

				const res = await axios.put(
					"http://localhost:5000/api/auth/profile",
					{ profilePicture: base64Image },
					{ withCredentials: true }
				);

				if (user && res.data.data)
					setUser({
						...user,
						profilePicture: res.data.data,
					});

				toast.success(res.data.message);
			} catch (error: any) {
				console.log(error);
				toast.error(
					error.response.data.message || error.response.statusText
				);
			} finally {
				setIsLoading(false);
			}
		};
	};
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="self-center">Profile</DialogTitle>
					<DialogDescription className="self-center">
						Your profile information
					</DialogDescription>
				</DialogHeader>
				<div>
					<div className="flex flex-col items-center mb-10">
						<div
							className={`relative w-[150px] h-[150px] ${
								isLoading && "opacity-50"
							} `}
						>
							<Image
								src={
									user?.profilePicture ||
									profilePicture ||
									"/avatar.png"
								}
								alt="avatar"
								fill={true}
								objectFit="cover"
								className="rounded-full"
							/>
							{isLoading && (
								<Loader className="absolute right-[50%] bottom-[50%] loader text-white " />
							)}
							<label
								htmlFor="avatar"
								className="bg-[#827c7c] rounded-full p-1 absolute right-2 bottom-2 hover:cursor-pointer"
							>
								<Camera size={30} className="text-[#000000]" />
								<input
									type="file"
									id="avatar"
									accept="image/*"
									className="hidden"
									disabled={isLoading}
									onChange={handleFileChange}
								/>
							</label>
						</div>
						<div className="text-sm text-[#989898]">
							Click on the camera icon to update your profile
						</div>
					</div>

					<div className="flex flex-col gap-5">
						<div>
							<User
								className="inline mb-1 text-[#c6c6c6]"
								size={20}
							/>
							<span className="text-xs mb-1 ml-2 text-[#c6c6c6]">
								Full Name
							</span>
							<div className="border border-[#acacac] p-2 rounded-lg">
								{user?.fullName || "Anon"}
							</div>
						</div>

						<div>
							<Mail
								className="inline mb-1 text-[#c6c6c6]"
								size={20}
							/>
							<span className="text-xs mb-1 ml-2 text-[#c6c6c6]">
								Email
							</span>
							<div className="border border-[#acacac] p-2 rounded-lg">
								{user?.email || "xyz@gmail.com"}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ProfilePictureDialog;

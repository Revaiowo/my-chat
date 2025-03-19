"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useSocketStore } from "@/store/socketStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserContext } from "@/Context/userContext";

function Register() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const userContext = useContext(UserContext);
	const setUser = userContext?.setUser!;

	const connectSocket = useSocketStore((state) => state.connectSocket);

	const form = useForm({
		defaultValues: {
			fullName: "",
			displayName: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: {
		fullName: string;
		displayName: string;
		email: string;
		password: string;
	}) {
		setLoading(true);
		try {
			if (
				!data.email ||
				!data.password ||
				!data.fullName ||
				!data.displayName
			)
				return toast.error("You need to fill all the fields");

			const res = await axios.post("/api/auth/register", data, {
				withCredentials: true,
			});

			setUser(res.data.data);
			connectSocket(res.data.data._id);
			toast.success(res.data.message);

			router.push("/");
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.error("Registaration error:", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="w-full h-full flex justify-center items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className=" border p-10 grid grid-cols-2 gap-10 text-[#ffffff]"
				>
					<div className="col-span-2 text-3xl justify-self-center">
						Register Form
					</div>
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter full name"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="displayName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Display Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter display name"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter email"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						className="col-span-2 justify-self-center min-w-52"
						type="submit"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Submit"}
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default Register;

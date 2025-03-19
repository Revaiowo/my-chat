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

function Login() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const userContext = useContext(UserContext);
	const setUser = userContext?.setUser!;

	const connectSocket = useSocketStore((state) => state.connectSocket);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: { email: string; password: string }) {
		setLoading(true);
		try {
			if (!data.email || !data.password)
				return toast.error("You need to fill all the fields");

			const res = await axios.post(
				"http://localhost:5000/api/auth/login",
				data,
				{ withCredentials: true }
			);

			setUser(res.data.data);
			connectSocket(res.data.data._id);
			toast.success(res.data.message);

			router.push("/");
		} catch (error: any) {
			toast.error(error.response.data.message);
			console.error("Login error:", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="w-full h-full flex justify-center items-center text-[#f7f7f7]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className=" border p-10 flex flex-col gap-10"
				>
					<div className="text-3xl">Login Form</div>

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
					<Button type="submit">
						{loading ? "Logging in..." : "Submit"}
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default Login;

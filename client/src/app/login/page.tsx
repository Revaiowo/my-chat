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
import { useState } from "react";
import { useForm } from "react-hook-form";

function Login() {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: { email: string; password: string }) {
		setLoading(true);
		try {
			const res = await axios.post(
				"http://localhost:5000/api/auth/login",
				data,
				{ withCredentials: true }
			);

			console.log("Login successful:", res.data.message);
			setMessage(res.data.message);
		} catch (error: any) {
			console.error("Login error:", error);
			setMessage(error.response.data.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="w-full h-full flex justify-center items-center">
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
					{message && (
						<div className="col-span-2 text-red-500">{message}</div>
					)}
					<Button className="" type="submit">
						{loading ? "Logging in..." : "Submit"}
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default Login;

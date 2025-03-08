"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Register() {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

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
			const res = await axios.post(
				"http://localhost:5000/api/auth/register",
				data,
				{ withCredentials: true }
			);

			console.log("Registration successful:", res.data.message);
			setMessage(res.data.message);
			// Handle successful login (e.g., save token, redirect)
		} catch (error: any) {
			console.error("Registaration error:", error.response.data);
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
					className=" border p-10 grid grid-cols-2 gap-10"
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
					{message && (
						<div className="col-span-2 text-red-500">{message}</div>
					)}
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

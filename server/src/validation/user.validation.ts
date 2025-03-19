import { z } from "zod";

export const userValidationSchema = z.object({
	email: z
		.string({ message: "Email can not be empty" })
		.email({ message: "Invalid email address" }),
	fullName: z
		.string({ message: "Full name can not be empty" })
		.min(2, { message: "Full name must be at least 2 characters" }),
	displayName: z
		.string({ message: "Display name can not be empty" })
		.min(2, { message: "Display name must be at least 2 characters" }),
	password: z
		.string({ message: "Password can not be empty" })
		.min(8, { message: "Password must be at least 8 characters" })
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, and one number",
		}),
});

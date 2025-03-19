import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserProvider from "@/Context/userContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "myChat",
	description: "Chat with your friends and family",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased `}
			>
				<div
					className="h-screen relative p-[10px] sm:p-[40px] overflow-hidden
          bgx-[linear-gradient(170deg,_#663399_50%,_#171717_50%);]
        "
				>
					<div className="bg-purple-700 min-h-[700px] w-[700px] absolute left-0 bottom-0 z-[-1] rounded-full transform translate-x-[-50%] translate-y-[50%]"></div>
					<div className="bg-red-400 min-h-[1000px] w-[1000px] absolute right-0 top-0 z-[-1] rounded-full transform translate-x-[50%] translate-y-[-50%]"></div>

					<Toaster />
					<UserProvider>{children}</UserProvider>
				</div>
			</body>
		</html>
	);
}

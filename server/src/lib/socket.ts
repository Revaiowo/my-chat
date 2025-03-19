import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL;

const io = new Server(server, {
	cors: {
		origin: [FRONTEND_URL!],
		credentials: true,
	},
});

export const getSocketId = (userId: string) => {
	return connectedSocketUsers[userId];
};

const connectedSocketUsers: {
	[userId: string]: string;
} = {};

io.on("connection", (socket) => {
	console.log("A user connected with id: ", socket.id);

	const userId = socket.handshake.query.userId as string;
	connectedSocketUsers[userId] = socket.id;

	io.emit("getOnlineUsers", {
		userIds: Object.keys(connectedSocketUsers),
	});

	socket.on("disconnect", () => {
		delete connectedSocketUsers[userId];
		io.emit("getOnlineUsers", {
			userIds: Object.keys(connectedSocketUsers),
		});
		console.log("A user disconnected with id: ", socket.id);
	});
});

export { app, server, io };

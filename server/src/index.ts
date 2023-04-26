import { config } from "dotenv";
import http from "http";
import express, { Application, NextFunction, Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";

config();

export type Player = {
	id: string,
	username: string,
	avatarId: number,
	roomCode: string,
	opponentsIds: string[]
}

const app: Application = express();
const httpServer = http.createServer(app);
const socketIo = require("socket.io");
const fs = require("fs");

app.use(cors());

var players = {};
var unmatched;

const io: Server = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

let players: Player[] = [];
io.on("connection", (socket) => {

	let roomName: string;

	console.log(`User connected ${ socket.id }`);

	socket.on("joinRoom", (roomCode, username) => {
		const chosenRoom = io.sockets.adapter.rooms.get(roomCode);

		//if chosen room already exists and has 3 players throw an error
		if (chosenRoom && chosenRoom.size === 3) {
			socket.emit("room_join_error", {
				error: "Pokój jest pełny, wybierz inny pokój do gry."
			});
		} else {
			roomName = roomCode;

			socket.join(roomCode);
			const room = io.sockets.adapter.rooms.get(roomCode);

			console.log(`A user ${ username } joined the room ${ roomCode }`);
			socket.emit("room_joined");

			players.push({
				id: socket.id,
				username: username,
				avatarId: 0,
				roomCode: roomCode,
				opponentsIds: [ "" ]
			});

			io.to(roomCode).emit("updatePlayers", players.filter(player => player.roomCode === roomName));

			if (room && room.size === 3) {
				io.to(roomCode).emit("startGame");
			}
		}
	});

	socket.on("disconnect", (reason) => {

		players = players.filter(player => player.id !== socket.id);

		io.to(roomName).emit("updatePlayers", players.filter(player => player.roomCode === roomName));

		socket.emit("socketDisconnected", reason);
		io.to(roomName).emit("otherUserDisconnected", socket.id);

		console.log(`User disconnected ID: ${ socket.id }`);
	});
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
	//const stream = fs.createReadStream(__dirname + "/../client/GamePage.tsx");

	res.send("Express server with TSesesss");


});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${ PORT }`);
});
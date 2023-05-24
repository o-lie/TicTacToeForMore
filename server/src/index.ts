import { config } from "dotenv";
import http from "http";
import express, { Application, NextFunction, Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";

config();

export type BoardMatrix = Array<number | null>;

export type Player = {
	id: string,
	username: string,
	boardIds: number[],
	avatarId: number,
	roomCode: string
}

const app: Application = express();
const httpServer = http.createServer(app);

app.use(cors());

const io: Server = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

let players: Player[] = [];
io.on("connection", (socket) => {

	let roomName: string;
	let userName: string;

	console.log(`User connected ${ socket.id }`);

	socket.on("joinRoom", (roomCode, username, avatarId) => {
		const chosenRoom = io.sockets.adapter.rooms.get(roomCode);
		userName = username;

		//if chosen room already exists and has 3 players throw an error
		if (chosenRoom && chosenRoom.size === 3) {
			socket.emit("room_join_error", {
				error: "Pokój jest pełny, wybierz inny pokój do gry."
			});
		}

		//if there is a player with the same username in the chosen room, throw an error
		else if (players.find(player => (player.roomCode === roomCode && player.username === username))) {
			socket.emit("room_join_error", {
				error: "W pokoju znajduje się już gracz o takiej nazwie. Wybierz inną."
			});
		}

		//if there is a player with the same avatar in the chosen room, throw an error
		else if (players.find(player => (player.roomCode === roomCode && player.avatarId === avatarId))) {
			socket.emit("room_join_error", {
				error: "W pokoju znajduje się już gracz o takim awatarze. Wybierz inny."
			});
		}

		//join chosen room
		else {
			roomName = roomCode;

			socket.join(roomCode);
			const room = io.sockets.adapter.rooms.get(roomCode);

			console.log(`A user ${ username } joined the room ${ roomCode }`);
			socket.emit("room_joined");

			if (players.filter(player => player.roomCode === roomCode).length === 0) {
				players.push({
					id: socket.id,
					boardIds: [ 0, 1 ],
					username: username,
					avatarId: avatarId,
					roomCode: roomCode
				});
			} else if (players.filter(player => player.roomCode === roomCode).length === 1) {
				players.push({
					id: socket.id,
					boardIds: [ 0, 2 ],
					username: username,
					avatarId: avatarId,
					roomCode: roomCode
				});
			} else if (players.filter(player => player.roomCode === roomCode).length === 2) {
				players.push({
					id: socket.id,
					boardIds: [ 1, 2 ],
					username: username,
					avatarId: avatarId,
					roomCode: roomCode
				});
			}

			//if chosen room has 3 players start the game
			io.in(roomCode).emit("updatePlayers", players.filter(player => player.roomCode === roomName), room && room.size === 3);
		}

		socket.on("startGame", () => {
			const playersInRoom = players.filter(player => player.roomCode === roomCode);

			playersInRoom.forEach((player, index) => {
				if (index === 0) {
					const boards = [
						{
							id: 0,
							matrix: [ null, null, null, null, null, null, null, null, null ],
							isPlayerTurn: true,
							hasWon: false,
							isTie: false,
							hasEnded: false
						},
						{
							id: 1,
							matrix: [ null, null, null, null, null, null, null, null, null ],
							isPlayerTurn: false,
							hasWon: false,
							isTie: false,
							hasEnded: false
						}
					];
					io.to(player.id).emit("gameStarted", boards);

				} else if (index === 1) {
					const boards = [
						{
							id: 0,
							matrix: [ null, null, null, null, null, null, null, null, null ],
							isPlayerTurn: false,
							hasWon: false,
							isTie: false,
							hasEnded: false
						},
						{
							id: 2,
							matrix: [ null, null, null, null, null, null, null, null, null ],
							isPlayerTurn: true,
							isTie: false,
							hasWon: false,
							hasEnded: false
						}
					];
					io.to(player.id).emit("gameStarted", boards);
				} else if (index === 2) {
					const boards = [
						{
							id: 1,
							matrix: [ null, null, null, null, null, null, null, null, null ],
							isPlayerTurn: true,
							hasWon: false,
							isTie: false,
							hasEnded: false
						},
						{
							id: 2,
							matrix: [ null, null, null, null, null, null, null, null, null ],
							isPlayerTurn: false,
							hasWon: false,
							isTie: false,
							hasEnded: false
						}
					];
					io.to(player.id).emit("gameStarted", boards);
				}
			});
		});

		socket.on("updateBoard", (matrix: BoardMatrix, boardId: number) => {
			socket.to(roomCode).emit("onUpdateBoard", matrix, boardId);
		});

		socket.on("endGame", (boardId: number, isGameATie: boolean) => {
			socket.to(roomCode).emit("onEndGame", boardId, isGameATie);
		});
	});

	socket.on("disconnect", (reason) => {
		players = players.filter(player => player.id !== socket.id);

		socket.emit("socketDisconnected", reason);
		io.in(roomName).emit("otherUserDisconnected", players.filter(player => player.roomCode === roomName).map((player, index) => {
			if (index === 0) {
				return {
					...player,
					boardIds: [ 0, 1 ]
				};
			} else if (index === 1) {
				return {
					...player,
					boardIds: [ 0, 2 ]
				};
			} else if (index === 2) {
				return {
					...player,
					boardIds: [ 1, 2 ]
				};
			}
		}));

		console.log(`User disconnected ID: ${ socket.id }`);
	});
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send("Express server with TS");
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${ PORT }`);
});
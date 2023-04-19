import { config } from "dotenv";
import http from "http";
import express, { Application, NextFunction, Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";

config();

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

let clientCount: number = 0;
io.on("connection", (socket) => {
	clientCount++;
	console.log(`User connected ${ socket.id }`);

	socket.on("disconnect", () => {
		clientCount--;
		console.log("User disconnected");
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
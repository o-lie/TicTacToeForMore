import { config } from 'dotenv';
import http from 'http';
import express, { Application, NextFunction, Request, Response } from 'express';
import { Server } from "socket.io";
import cors from "cors";

config();

const app: Application = express();
const server = http.createServer(app);

app.use(cors());

const io: Server = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('Express server with TSesesss');
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
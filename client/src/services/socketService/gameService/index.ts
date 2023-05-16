import { Socket } from "socket.io-client";
import { IPlayMatrix } from "src/types/types";

class GameService {

	public async updateGame(socket: Socket, gameMatrix: IPlayMatrix, boardId: number) {
		socket.emit("updateGame", { matrix: gameMatrix, boardId: boardId });
	}

	public async onGameUpdate(socket: Socket, listener: (matrix: IPlayMatrix, boardId: number) => void) {
		socket.on("onGameUpdate", ({ matrix, boardId }) => listener(matrix, boardId));
	}

	public async gameWin(socket: Socket, message: string) {
		socket.emit("game_win", { message });
	}

	public async OnGameWin(socket: Socket, listener: (message: string) => void) {
		socket.on("on_game_win", ({ message }) => listener(message));
	}
}

export default new GameService();
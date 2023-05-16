import { Socket } from "socket.io-client";
import { IPlayMatrix } from "src/types/types";

class GameService {

	public async updateBoard(socket: Socket, gameMatrix: IPlayMatrix, boardId: number) {
		socket.emit("updateBoard", { matrix: gameMatrix, boardId: boardId });
	}

	public async onUpdateBoard(socket: Socket, listener: (matrix: IPlayMatrix, boardId: number) => void) {
		socket.on("onUpdateBoard", ({ matrix, boardId }) => listener(matrix, boardId));
	}

	public async endGame(socket: Socket, boardId: number, isTie: boolean) {
		socket.emit("endGame", { boardId, isTie });
	}

	public async onEndGame(socket: Socket, listener: (boardId: number, isTie: boolean) => void) {
		socket.on("onEndGame", ({ boardId, isTie }) => listener(boardId, isTie));
	}
}

export default new GameService();
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

class SocketService {
	public socket: Socket | null = null;

	public connect(
		url: string
	): Promise<Socket<DefaultEventsMap, DefaultEventsMap>> {
		return new Promise((rs, rj) => {
			this.socket = io(url);

			if (!this.socket) return rj();

			this.socket.on("connect", () => {
				console.log(`User connected ${ this.socket?.id }`);

				rs(this.socket as Socket);
			});

			this.socket.on("connect_error", (err) => {
				console.log("Connection error: ", err);
				rj(err);
			});

			this.socket.on("disconnect", () => {
				console.log(`User disconnected ${ this.socket?.id }`);
			});
		});
	}

	public async joinRoom(
		data: {
			roomCode: string,
			username: string,
			avatarId: number
		}
	): Promise<boolean> {
		return new Promise((rs, rj) => {
			this.socket?.emit("joinRoom", data.roomCode, data.username, data.avatarId);
			this.socket?.on("room_joined", () => rs(true));
			this.socket?.on("room_join_error", ({ error }) => rj(error));
		});
	}
}

export default new SocketService();
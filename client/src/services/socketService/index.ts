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
				this.socket?.emit("join", "room1");
			});

			this.socket.on("connect_error", (err) => {
				console.log("Connection error: ", err);
				rj(err);
				this.socket?.disconnect();
			});

			this.socket.on("disconnect", () => {
				console.log(`User disconnected ${ this.socket?.id }`);
			});

		});
	}
}

export default new SocketService();
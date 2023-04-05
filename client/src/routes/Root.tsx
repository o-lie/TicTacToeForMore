import { useState } from 'react';
import io, { Socket } from "socket.io-client";
import socketService from "src/services/socketService";

const Root = () => {
	const [ serverAddress, setServerAddress ] = useState("");
	const [ socket, setSocket ] = useState<Socket>();

	const connectSocket = async () => {
		const socket = await socketService
			.connect(serverAddress)
			.catch((err) => {
				console.log("Error: ", err);
			});

		console.log(socket);
	};


	const onSubmit = () => {
		connectSocket().then(r => console.log(r));
	}

	return (
		<>
			<label>Podaj adres IP serwera:</label>
			<input
				value={ serverAddress }
				onChange={ (e) => setServerAddress(e.target.value)}
			/>
			<button onClick={ onSubmit }>Połącz</button>
		</>
	);
};

export default Root;
import { useContext, useEffect } from "react";
import { Box, Container, Modal, Typography } from "@mui/material";
import { SnackbarContext } from "src/providers/SnackbarProvider";
import ConnectToServer from "src/components/ConnectToServer";
import WaitingRoom from "src/components/WaitingRoom";
import { GameContext } from "src/providers/GameProvider";
import Game from "src/components/Game";
import socketService from "src/services/socketService";
import JoinRoom from "src/components/JoinRoom";

type Data = {
	serverAddress: string,
	username: string
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "1px solid #dedede",
	borderRadius: "15px",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	gap: "2rem"
};
const Root = () => {

	const { showSnackbar } = useContext(SnackbarContext);
	const { gameState, setGameState } = useContext(GameContext);

	const socket = socketService.socket;

	useEffect(() => {
		socket?.on("startGame", () => {
			setGameState({ ...gameState, isStarted: true });
		});

		socket?.on("socketDisconnected", (reason) => {
			setGameState({ ...gameState, isConnected: false, isStarted: false });
			showSnackbar(`Zostałeś rozłączony z serwerem. ${ reason }`, "error");
		});

		socket?.on("otherUserDisconnected", (username) => {
			setGameState({ ...gameState, isStarted: false });
			showSnackbar(`Użytkownik ${ username } opuścił pokój.`, "info");
		});
	});

	return (
		<>
			<Modal
				open={ !gameState.isConnected }
				aria-labelledby="modal-connect-title"
			>
				<Box sx={ style }>
					<Typography id="modal-connect-title" variant="h4" component="h2" align="center">
						Połącz się z serwerem
					</Typography>
					<ConnectToServer/>
				</Box>
			</Modal>
			<Modal
				open={ gameState.isConnected && !gameState.hasJoined }
				aria-labelledby="modal-connect-title"
			>
				<Box sx={ style }>
					<Typography id="modal-connect-title" variant="h4" component="h2" align="center">
						Dołącz do gry
					</Typography>
					<JoinRoom/>
				</Box>
			</Modal>
			<Container maxWidth={ "md" }>
				{
					(gameState.isConnected && gameState.hasJoined && !gameState.isStarted) &&
                    <WaitingRoom/>
				}
				{
					gameState.isStarted &&
                    <Game/>
				}
			</Container>
		</>
	);
};

export default Root;
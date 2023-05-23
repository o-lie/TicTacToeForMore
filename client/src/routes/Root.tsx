import { useContext, useEffect } from "react";
import { Box, Container, Modal, Typography } from "@mui/material";
import { SnackbarContext } from "src/providers/SnackbarProvider";
import ConnectToServer from "src/components/ConnectToServer";
import WaitingRoom from "src/components/WaitingRoom";
import { GameContext } from "src/providers/GameProvider";
import Game from "src/components/Game";
import socketService from "src/services/socketService";
import JoinRoom from "src/components/JoinRoom";
import { Player } from "src/types/types";
import Logo from "src/components/Logo";

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

		socket?.on("socketDisconnected", (reason) => {
			setGameState({ ...gameState, isConnected: false, canStart: false, isStarted: false });
			showSnackbar(`Zostałeś rozłączony z serwerem. ${ reason }`, "error");
		});

		socket?.on("otherUserDisconnected", (players: Player[]) => {
			setGameState({ ...gameState, canStart: false, isStarted: false, allPlayers: players, clientCount: players.length });
			showSnackbar(`Inny użytkownik opuścił pokój.`, "info");
		});

		socket?.on("updatePlayers", (players: Player[], canStartGame) => {
			setGameState({ ...gameState, allPlayers: players, clientCount: players.length, canStart: canStartGame });
		});

		socket?.on("disconnect", () => {
			setGameState({ ...gameState, isStarted: false, isConnected: false, canStart: false });
			showSnackbar(`Rozłączono z serwerem.`, "error");
		});
	});

	return (
		<>
			<Modal
				open={ !gameState.isConnected }
				aria-labelledby="modal-connect-title"
			>
				<Box sx={ style }>
					<Logo/>
					<Typography id="modal-connect-title" variant="h4" component="h2" align="center">
						Połącz się z serwerem
					</Typography>
					<ConnectToServer/>
				</Box>
			</Modal>
			<Modal
				open={ gameState.isConnected && !gameState.hasJoined }
				aria-labelledby="modal-join-title"
			>
				<Box sx={ style }>
					<Logo/>
					<Typography id="modal-join-title" variant="h4" component="h2" align="center">
						Dołącz do gry
					</Typography>
					<JoinRoom/>
				</Box>
			</Modal>
			<Modal open={ gameState.isConnected && gameState.hasJoined && !gameState.isStarted }>
				<Box sx={ style }>
					<Logo/>
					<Typography id="modal-join-title" variant="h4" component="h2" align="center">
						Poczekaj na wszystkich graczy
					</Typography>
					<WaitingRoom/>
				</Box>
			</Modal>
			<Container>
				<Game/>
			</Container>
		</>
	);
};

export default Root;
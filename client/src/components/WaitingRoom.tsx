import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "src/providers/GameProvider";
import Pepper from "src/assets/images/avatar-1.png";
import socketService from "src/services/socketService";
import { Player } from "src/types/types";

const WaitingRoom = () => {
	const { gameState, setGameState } = useContext(GameContext);
	const socket = socketService.socket;
	const [ players, setPlayers ] = useState<Player[]>();

	useEffect(() => {

		socket?.on("updatePlayers", (players) => {
			setPlayers(players);
			setGameState({ ...gameState, clientCount: players.length });
		});

		return () => {
			socket?.off("updateClientCount");
		};
	});

	return (
		<Box>
			{
				players &&
				players.map(player => {
					return (player.username);
				})
			}
			<Typography variant={ "h1" }>
				Witaj w grze!
			</Typography>
			<Typography variant={ "h3" }>
				Status: W oczekiwaniu na graczy { gameState.clientCount }/3
			</Typography>
			<Stack spacing={ 2 } direction={ "row" }>
				<Avatar src={ Pepper }></Avatar>
				<Typography variant={ "h5" }>{ gameState.username }</Typography>
			</Stack>
		</Box>
	);
};
export default WaitingRoom;
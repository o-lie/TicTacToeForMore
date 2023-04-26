import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "src/providers/GameProvider";
import Pepper from "src/assets/images/avatar-1.png";
import Apple from "src/assets/images/avatar-0.png";
import Lemon from "src/assets/images/avatar-2.png";
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
			socket?.off("updatePlayers");
		};
	});

	return (
		<Box>
			<Typography variant={ "h2" }>
				Witaj w pokoju { gameState.roomCode }!
			</Typography>
			<Typography variant={ "h3" }>
				Status: W oczekiwaniu na graczy { gameState.clientCount }/3
			</Typography>
			<List sx={ { width: "100%", maxWidth: 360, bgcolor: "background.paper" } }
				  subheader={ <ListSubheader>Lista graczy</ListSubheader> }
			>
				{
					players &&
					players.map(player => {
						return (
							<ListItem>
								<ListItemAvatar>
									<Avatar src={ player.avatarId === 0 ? Apple : (player.avatarId === 1 ? Lemon : Pepper) }></Avatar>
								</ListItemAvatar>
								<ListItemText primary={ player.username }/>
							</ListItem>
						);
					})
				}
			</List>
		</Box>
	);
};
export default WaitingRoom;
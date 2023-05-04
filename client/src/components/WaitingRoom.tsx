import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from "@mui/material";
import React, { useContext } from "react";
import { GameContext } from "src/providers/GameProvider";
import Pepper from "src/assets/images/avatar-1.png";
import Apple from "src/assets/images/avatar-0.png";
import Lemon from "src/assets/images/avatar-2.png";
import socketService from "src/services/socketService";

const WaitingRoom = () => {
	const { gameState, setGameState } = useContext(GameContext);
	const socket = socketService.socket;

	const onSubmit = () => {
		socket?.emit("startGame");
	};

	return (
		<Box>
			<Typography variant={ "h2" }>
				Witaj w pokoju { gameState.roomCode }!
			</Typography>
			<List sx={ { width: "100%", maxWidth: 360, bgcolor: "background.paper" } }
				  subheader={ <ListSubheader>Lista graczy { gameState.clientCount }/3</ListSubheader> }
			>
				{
					gameState.allPlayers &&
					gameState.allPlayers.map(player => {
						return (
							<ListItem key={ player.id }>
								<ListItemAvatar>
									<Avatar src={ player.avatarId === 0 ? Apple : (player.avatarId === 1 ? Lemon : Pepper) }></Avatar>
								</ListItemAvatar>
								<ListItemText primary={ player.username }/>
							</ListItem>
						);
					})
				}
			</List>
			<Button
				variant="contained"
				onClick={ onSubmit }
				disabled={ !gameState.canStart }
			>
				Rozpocznij grę
			</Button>
		</Box>
	);
};
export default WaitingRoom;
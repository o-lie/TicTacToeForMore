import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, ListSubheader } from "@mui/material";
import React, { useContext, useState } from "react";
import { GameContext } from "src/providers/GameProvider";
import Pepper from "src/assets/images/avatar-1.png";
import Apple from "src/assets/images/avatar-0.png";
import Lemon from "src/assets/images/avatar-2.png";
import SocketService from "src/services/socketService";

const WaitingRoom = () => {
	const { gameState, setGameState } = useContext(GameContext);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const onSubmit = async () => {
		setIsLoading(true);
		await SocketService
			.startGame()
			.then(() => {
				setGameState({ ...gameState, isStarted: true });
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				console.log("Error: ", err);
			});
	};

	return (
		<Box>
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
				disabled={ !gameState.canStart || isLoading }
				style={ {
					width: "100%"
				} }
			>
				Rozpocznij grę
			</Button>
		</Box>
	);
};
export default WaitingRoom;
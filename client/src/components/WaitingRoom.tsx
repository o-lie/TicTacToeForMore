import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "src/providers/GameProvider";
import Pepper from "src/assets/images/avatar-1.png";

const WaitingRoom = () => {
	const { gameState, setGameState } = useContext(GameContext);

	return (
		<Box>
			<Typography variant={ "h1" }>
				Witaj w grze!
			</Typography>
			<Typography variant={ "h3" }>
				Status: W oczekiwaniu na graczy
			</Typography>
			<Stack spacing={ 2 } direction={ "row" }>
				<Avatar src={ Pepper }></Avatar>
				<Typography variant={ "h5" }>{ gameState.username }</Typography>
			</Stack>
		</Box>
	);
};
export default WaitingRoom;
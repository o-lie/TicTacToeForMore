import { useState } from "react";
import { Container } from "@mui/material";
import SnackbarProvider from "src/providers/SnackbarProvider";
import Connect from "src/components/Connect";
import WaitingRoom from "src/components/WaitingRoom";
import { GameContext } from "src/providers/GameProvider";
import { GameState } from "src/types/types";
import Game from "src/components/Game";

type Data = {
	serverAddress: string,
	username: string
}

const Root = () => {
	const [ gameState, setGameState ] = useState<GameState>({
		isConnected: false,
		isStarted: false,
		username: ""
	});

	return (
		<GameContext.Provider value={ { gameState, setGameState } }>
			<SnackbarProvider>
				{/*<AppBar position="static" color={"transparent"}>*/ }
				{/*	<Toolbar>*/ }
				{/*		<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>*/ }
				{/*			News*/ }
				{/*		</Typography>*/ }
				{/*	</Toolbar>*/ }
				{/*</AppBar>*/ }
				<Container maxWidth={ "md" }>
					{
						!gameState.isConnected &&
                        <Connect/>
					}
					{
						gameState.isConnected &&
                        <WaitingRoom/>
					}
					{
						gameState.isStarted &&
                        <Game/>
					}
				</Container>
			</SnackbarProvider>
		</GameContext.Provider>
	);
};

export default Root;
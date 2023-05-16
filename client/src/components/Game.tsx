import GameBoard from "src/components/GameBoard";
import { Stack } from "@mui/material";
import React, { useContext } from "react";
import { GameContext } from "src/providers/GameProvider";

const Game = () => {
	const { gameState, setGameState } = useContext(GameContext);

	return (
		<>

			<Stack direction={ "row" } spacing={ 2 }>
				{
					gameState.boards?.map(board => <GameBoard key={ board.id } id={ board.id } hasWon={ board.hasWon } hasEnded={ board.hasEnded } isPlayerTurn={ board.isPlayerTurn }/>)
				}
			</Stack>
		</>
	);
};

export default Game;
import React, { useContext } from "react";
import { BoardMatrix } from "src/types/types";
import { GameContext } from "src/providers/GameProvider";
import { Stack, Typography } from "@mui/material";
import Cell from "src/components/Cell";

type Props = {
	id: number,
	matrix: BoardMatrix,
	isPlayerTurn: boolean,
	isTie: boolean,
	hasWon: boolean,
	hasEnded: boolean,
	updateMatrix: (newMatrix: BoardMatrix, boardId: number) => void
}
const GameBoard = (props: Props) => {

	const {
		id,
		matrix,
		isPlayerTurn,
		isTie,
		hasWon,
		hasEnded,
		updateMatrix
	} = props;

	const { gameState, setGameState } = useContext(GameContext);

	const updateGameMatrix = (index: number, symbol: number) => {
		const newMatrix = [ ...matrix ];

		if (newMatrix[ index ] === null) {
			newMatrix[ index ] = symbol;
			updateMatrix(newMatrix, id);
		}
	};

	return (
		<>
			{
				hasEnded
					?
					<Typography variant={ "h1" }>{ isTie ? "Remis" : hasWon ? "Wygrałeś!" : "Przegrałeś :(" }</Typography>
					:
					<Stack direction={ "column" }>
						<Typography>{ isPlayerTurn ? "Twoja kolej" : "Kolej przeciwnika" }</Typography>

						<div className="board">
							{
								matrix.map((cell, cellIndex) => {
									return (
										<Cell
											key={ cellIndex }
											content={ cell }
											updateGameMatrix={ (cellId, avatarId) => updateGameMatrix(cellId, avatarId) }
											id={ cellIndex }
											avatarId={ gameState.avatarId }
											isPlayerTurn={ isPlayerTurn }
											hasEnded={ hasEnded }
										/>
									);
								})
							}
						</div>
					</Stack>
			}

		</>
	);
};

export default GameBoard;
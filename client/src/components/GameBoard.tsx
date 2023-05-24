import React, { useContext } from "react";
import { BoardMatrix } from "src/types/types";
import { GameContext } from "src/providers/GameProvider";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import Cell from "src/components/Cell";
import Apple from "src/assets/images/avatar-0.png";
import Lemon from "src/assets/images/avatar-2.png";
import Pepper from "src/assets/images/avatar-1.png";

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

	const currentPlayer = gameState.allPlayers.find(player => player.username === gameState.username);
	const opponent = gameState.allPlayers.find(player => (player.boardIds?.includes(id) && player.username !== gameState.username));

	return (
		<>
			{
				hasEnded
					?
					<div className="end-game-text">{ isTie ? "Remis" : hasWon ? "Wygrałeś!" : "Przegrałeś :(" }</div>
					:
					<Stack direction={ "column" }>
						<div className="gameText">{ isPlayerTurn ? "Twoja kolej" : "Kolej przeciwnika" }</div>
						<div className={ "players" }>
							{
								currentPlayer
								&&
                                <ListItem key={ currentPlayer.id } className="player player--current">
                                    <ListItemAvatar>
                                        <Avatar src={ currentPlayer.avatarId === 0 ? Apple : (currentPlayer.avatarId === 1 ? Lemon : Pepper) }></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={ currentPlayer.username }/>
                                </ListItem>
							}
							VS
							{
								opponent
								&&
                                <ListItem key={ opponent.id } className="player">
                                    <ListItemAvatar>
                                        <Avatar src={ opponent.avatarId === 0 ? Apple : (opponent.avatarId === 1 ? Lemon : Pepper) }></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={ opponent.username }/>
                                </ListItem>
							}
						</div>
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
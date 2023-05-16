import React, { useContext, useEffect, useState } from "react";
import gameService from "../services/socketService/gameService";
import socketService from "../services/socketService";
import { IPlayMatrix } from "src/types/types";
import { GameContext } from "src/providers/GameProvider";
import { Stack, Typography } from "@mui/material";
import Cell from "src/components/Cell";

type Props = {
	id: number,
	hasEnded: boolean,
	hasWon: boolean,
	isPlayerTurn: boolean
}
const GameBoard = (props: Props) => {
	const [ matrix, setMatrix ] = useState<IPlayMatrix>(
		[ null, null, null, null, null, null, null, null, null ]
	);

	const [ isTie, setIsTie ] = useState(false);

	const { gameState, setGameState } = useContext(GameContext);

	const socket = socketService.socket;

	const {
		id,
		hasEnded,
		hasWon,
		isPlayerTurn
	} = props;
	const checkGameState = (matrix: IPlayMatrix) => {
		const match = [ gameState.avatarId, gameState.avatarId, gameState.avatarId ].toString();

		const possibleWins = [
			[ matrix[ 0 ], matrix[ 1 ], matrix[ 2 ] ].toString(),
			[ matrix[ 3 ], matrix[ 4 ], matrix[ 5 ] ].toString(),
			[ matrix[ 6 ], matrix[ 7 ], matrix[ 8 ] ].toString(),
			[ matrix[ 0 ], matrix[ 3 ], matrix[ 6 ] ].toString(),
			[ matrix[ 1 ], matrix[ 4 ], matrix[ 7 ] ].toString(),
			[ matrix[ 2 ], matrix[ 5 ], matrix[ 8 ] ].toString(),
			[ matrix[ 0 ], matrix[ 4 ], matrix[ 8 ] ].toString(),
			[ matrix[ 2 ], matrix[ 4 ], matrix[ 6 ] ].toString()
		];

		if (possibleWins.includes(match)) {
			return [ true, false ];
		} else if (!matrix.includes(null)) {
			return [ true, true ];
		} else {
			return [ false, false ];
		}
	};
	const updateGameMatrix = (index: number, symbol: number) => {
		const newMatrix = [ ...matrix ];

		if (newMatrix[ index ] === null) {
			newMatrix[ index ] = symbol;
			setMatrix(newMatrix);
		}

		if (socket) {
			const newBoardsState = gameState.boards.map(board => {
				if (board.id === id) {
					return (
						{
							...board,
							isPlayerTurn: false
						}
					);
				} else {
					return board;
				}
			});

			setGameState({ ...gameState, boards: newBoardsState });

			gameService.updateBoard(socket, newMatrix, id);

			//check board
			const [ currentPlayerWon, otherPlayerWon ] = checkGameState(newMatrix);

			console.log(currentPlayerWon);
			if (currentPlayerWon) {
				if (otherPlayerWon) {
					setIsTie(true);
				}
				setGameState(
					{
						...gameState,
						boards: gameState.boards.map(board => {
							if (board.id === id) {
								return (
									{
										...board,
										hasWon: true,
										hasEnded: true
									}
								);
							} else {
								return board;
							}
						})
					}
				);
				gameService.endGame(socket, id, currentPlayerWon && otherPlayerWon);
			}
		}
	};

	const handleGameUpdate = () => {
		if (socket) {
			gameService.onUpdateBoard(socket, (newMatrix, boardId) => {
				if (boardId === id) {
					const newBoardsState = gameState.boards.map(board => {
						if (board.id === boardId) {
							return (
								{
									...board,
									isPlayerTurn: true
								}
							);
						} else {
							return board;
						}
					});
					setMatrix(newMatrix);
					setGameState({ ...gameState, boards: newBoardsState });
				}
			});
		}
	};

	const handleGameEnd = () => {
		if (socket) {
			gameService.onEndGame(socket, (boardId, isGameATie) => {
				if (boardId === id) {
					if (isGameATie) {
						setIsTie(isGameATie);
					}
					const newBoardsState = gameState.boards.map(board => {
						if (board.id === boardId) {
							return (
								{
									...board,
									hasWon: isGameATie,
									hasEnded: true
								}
							);
						} else {
							return board;
						}
					});
					setGameState({ ...gameState, boards: newBoardsState });
				}
			});
		}
	};

	useEffect(() => {
		handleGameUpdate();
		handleGameEnd();
	}, []);

	return (
		<>
			{
				hasEnded
					?
					<Typography variant={ "h1" }>{ isTie ? "Remis" : hasWon ? "Wygrałeś!" : "Przegrałeś :(" }</Typography>
					:
					<Stack direction={ "column" }>
						<Typography variant={ "h1" }>ID: { id }</Typography>
						<Typography>{ isPlayerTurn ? "Twoja kolej" : "Kolej przeciwnika" }</Typography>

						<div className="board">
							{
								matrix.map((cell, cellIndex) => {
									return (
										<Cell key={ cellIndex } content={ cell } updateGameMatrix={ () => updateGameMatrix(cellIndex, gameState.avatarId) } boardId={ id }/>
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
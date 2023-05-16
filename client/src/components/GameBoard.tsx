import React, { useContext, useEffect, useState } from "react";
import gameService from "../services/socketService/gameService";
import socketService from "../services/socketService";
import { IPlayMatrix } from "src/types/types";
import { GameContext } from "src/providers/GameProvider";
import { Stack, Typography } from "@mui/material";
import Cell from "src/components/Cell";

type Props = {
	id: number
}

const GameBoard = (props: Props) => {
	const [ matrix, setMatrix ] = useState<IPlayMatrix>([
		[ null, null, null ],
		[ null, null, null ],
		[ null, null, null ]
	]);

	const { gameState, setGameState } = useContext(GameContext);

	const socket = socketService.socket;

	const { id } = props;
	const checkGameState = (matrix: IPlayMatrix) => {
		for (let i = 0 ; i < matrix.length ; i++) {
			let row = [];
			for (let j = 0 ; j < matrix[ i ].length ; j++) {
				row.push(matrix[ i ][ j ]);
			}

			if (row.every((value) => value && value === gameState.avatarId)) {
				return [ true, false ];
			} else if (row.every((value) => value && value !== gameState.avatarId)) {
				return [ false, true ];
			}
		}

		for (let i = 0 ; i < matrix.length ; i++) {
			let column = [];
			for (let j = 0 ; j < matrix[ i ].length ; j++) {
				column.push(matrix[ j ][ i ]);
			}
			if (column.every((value) => value && value === gameState.avatarId)) {
				return [ true, false ];
			} else if (column.every((value) => value && value !== gameState.avatarId)) {
				return [ false, true ];
			}
		}
		if (matrix[ 1 ][ 1 ]) {
			if (matrix[ 0 ][ 0 ] === matrix[ 1 ][ 1 ] && matrix[ 2 ][ 2 ] === matrix[ 1 ][ 1 ]) {
				if (matrix[ 1 ][ 1 ] === gameState.avatarId) {
					return [ true, false ];
				} else {
					return [ false, true ];
				}
			}

			if (matrix[ 2 ][ 0 ] === matrix[ 1 ][ 1 ] && matrix[ 0 ][ 2 ] === matrix[ 1 ][ 1 ]) {
				if (matrix[ 1 ][ 1 ] === gameState.avatarId) {
					return [ true, false ];
				} else {
					return [ false, true ];
				}
			}
		}

		if (matrix.every((m) => m.every((v) => v !== null))) {
			return [ true, true ];
		}
		return [ false, false ];
	};

	const updateGameMatrix = (column: number, row: number, symbol: number) => {
		const newMatrix = [ ...matrix ];
		console.log(id);
		// if (newMatrix[ row ][ column ] === null || newMatrix[ row ][ column ] === null) {
		// 	newMatrix[ row ][ column ] = symbol;
		// 	setMatrix(newMatrix);
		// }
		//
		// if (socket) {
		// 	gameService.updateGame(socket, newMatrix, id);
		// 	const [ currentPlayerWon, otherPlayerWon ] = checkGameState(newMatrix);
		// 	if (currentPlayerWon && otherPlayerWon) {
		// 		gameService.gameWin(socket, "The Game is a TIE!");
		// 		alert("The game is a TIE!");
		// 	} else if (currentPlayerWon && !otherPlayerWon) {
		// 		gameService.gameWin(socket, "You Lost!");
		// 		alert("You Won!");
		// 	}
		// 	setGameState({ ...gameState, isPlayerTurn: [ false ] });
		// }
	};

	const handleGameUpdate = () => {
		if (socket) {
			gameService.onGameUpdate(socket, (newMatrix, boardId) => {
				if (boardId === id) {
					setMatrix(newMatrix);
					checkGameState(newMatrix);
					setGameState({ ...gameState, isPlayerTurn: [ true ] });
				}
			});
		}
	};

	const handleGameWin = () => {
		if (socket) {
			gameService.OnGameWin(socket, (message) => {
				console.log("Here", message);
				setGameState({ ...gameState, isPlayerTurn: [ false ] });
				alert(message);
			});
		}
	};

	socket?.on("updateBoard", (matrix) => {
		setMatrix(matrix);
	});

	useEffect(() => {
		handleGameUpdate();
		handleGameWin();
	}, []);

	console.log(gameState);
	return (
		<Stack direction={ "column" }>
			<Typography variant={ "h1" }>ID: { id }</Typography>
			{
				gameState.boards?.map(board => {
					return (
						board.id === id &&
                        <Typography>{ board.isPlayerTurn ? "Twoja kolej" : "Kolej przeciwnika" }</Typography>
					);
				})
			}
			<div className="board">
				{
					matrix.map((row, rowIdx) => {
						return (
							row.map((col, colIdx) => (
								<Cell key={ rowIdx + colIdx } content={ col } updateGameMatrix={ () => updateGameMatrix(colIdx, rowIdx, gameState.avatarId) }/>
							))
						);
					})
				}
			</div>
		</Stack>
	);
};

export default GameBoard;
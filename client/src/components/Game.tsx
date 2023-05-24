import GameBoard from "src/components/GameBoard";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "src/providers/GameProvider";
import { Board, BoardMatrix } from "src/types/types";
import socketService from "src/services/socketService";
import { SnackbarContext } from "src/providers/SnackbarProvider";

const Game = () => {
	const { gameState, setGameState } = useContext(GameContext);
	const { showSnackbar } = useContext(SnackbarContext);

	const [ boardsState, setBoardsState ] = useState<Board[]>();

	const socket = socketService.socket;

	const checkGameState = (matrix: BoardMatrix) => {
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

	useEffect(() => {
		socket?.on("gameStarted", (boards: Board[]) => {
			setGameState({ ...gameState, isStarted: true });
			showSnackbar(`Gra rozpoczęta.`, "success");
			setBoardsState(boards);
		});
	});

	const onUpdateMatrix = (newMatrix: BoardMatrix, boardId: number) => {
		setBoardsState(prevState =>
			prevState?.map(prevBoard => {
				if (prevBoard.id === boardId) {
					return (
						{
							...prevBoard,
							matrix: newMatrix,
							isPlayerTurn: false
						}
					);
				} else {
					return prevBoard;
				}
			})
		);

		socket?.emit("updateBoard", newMatrix, boardId);

		const [ currentPlayerWon, otherPlayerWon ] = checkGameState(newMatrix);

		if (currentPlayerWon) {
			setBoardsState(prevState =>
				prevState?.map(prevBoard => {
					if (prevBoard.id === boardId) {
						return (
							{
								...prevBoard,
								hasWon: true,
								hasEnded: true,
								isPlayerTurn: false
							}
						);
					} else {
						return prevBoard;
					}
				})
			);
			socket?.emit("endGame", boardId, (currentPlayerWon && otherPlayerWon));
		}
	};

	const handleGameUpdate = () => {
		socket?.on("onUpdateBoard", (newMatrix: BoardMatrix, boardId: number) => {
			setBoardsState(prevState =>
				prevState?.map(prevBoard => {
					if (prevBoard.id === boardId) {
						return (
							{
								...prevBoard,
								matrix: newMatrix,
								isPlayerTurn: true
							}
						);
					} else {
						return prevBoard;
					}
				})
			);
		});
	};

	const handleGameEnd = () => {
		socket?.on("onEndGame", (boardId: number, isGameATie: boolean) => {
			setBoardsState(prevState =>
				prevState?.map(prevBoard => {
					if (prevBoard.id === boardId) {
						return (
							{
								...prevBoard,
								hasWon: isGameATie,
								hasEnded: true,
								isPlayerTurn: false
							}
						);
					} else {
						return prevBoard;
					}
				})
			);
		});
	};

	useEffect(() => {
		handleGameUpdate();
		handleGameEnd();
	});

	return (
		<>
			<div className="boards">
				{
					boardsState?.map(board =>
						<GameBoard
							key={ board.id }
							id={ board.id }
							matrix={ board.matrix }
							isPlayerTurn={ board.isPlayerTurn }
							hasWon={ board.hasWon }
							hasEnded={ board.hasEnded }
							updateMatrix={ (newMatrix, boardId) => onUpdateMatrix(newMatrix, boardId) }
						/>
					)
				}
			</div>
		</>
	);
};

export default Game;
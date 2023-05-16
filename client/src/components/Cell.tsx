import { Avatar } from "@mui/material";
import Apple from "src/assets/images/avatar-0.png";
import Lemon from "src/assets/images/avatar-2.png";
import Pepper from "src/assets/images/avatar-1.png";
import React, { useContext } from "react";
import { GameContext } from "src/providers/GameProvider";

type Props = {
	content: number | null
	updateGameMatrix: () => void,
	boardId: number
}
const Cell = (props: Props) => {
	const { gameState, setGameState } = useContext(GameContext);

	return (
		<button
			className="cell"
			onClick={ props.updateGameMatrix }
			disabled={ !gameState.boards.find(board => board.id === props.boardId)?.isPlayerTurn }
			key={ props.content }
		>
			{
				props.content !== null
					?
					<Avatar src={ props.content === 0 ? Apple : (props.content === 1 ? Lemon : Pepper) }></Avatar>
					:
					""
			}
		</button>
	);
};

export default Cell;
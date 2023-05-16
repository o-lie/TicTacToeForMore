import { Avatar } from "@mui/material";
import Apple from "src/assets/images/avatar-0.png";
import Lemon from "src/assets/images/avatar-2.png";
import Pepper from "src/assets/images/avatar-1.png";
import React, { useContext } from "react";
import { GameContext } from "src/providers/GameProvider";

type Props = {
	content: number | null
	updateGameMatrix: any
}
const Cell = (props: Props) => {
	const { gameState, setGameState } = useContext(GameContext);

	return (
		<div
			className="cell"
			onClick={ props.updateGameMatrix }
			key={ props.content }
		>
			{
				props.content !== null
					?
					<Avatar src={ props.content === 0 ? Apple : (props.content === 1 ? Lemon : Pepper) }></Avatar>
					:
					""
			}
		</div>
	);
};

export default Cell;
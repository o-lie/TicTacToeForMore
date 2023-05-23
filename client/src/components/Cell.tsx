import { Avatar } from "@mui/material";
import Apple from "src/assets/images/avatar-0.png";
import Lemon from "src/assets/images/avatar-2.png";
import Pepper from "src/assets/images/avatar-1.png";
import React from "react";

type Props = {
	content: number | null,
	isPlayerTurn: boolean,
	hasEnded: boolean,
	updateGameMatrix: (cellId: number, avatarId: number) => void,
	id: number,
	avatarId: number
}
const Cell = (props: Props) => {
	const {
		content,
		isPlayerTurn,
		hasEnded,
		updateGameMatrix,
		id,
		avatarId
	} = props;

	return (
		<button
			className="cell"
			onClick={ () => updateGameMatrix(id, avatarId) }
			disabled={ !isPlayerTurn || hasEnded }
			key={ content }
		>
			{
				content !== null
					?
					<Avatar src={ content === 0 ? Apple : (content === 1 ? Lemon : Pepper) }></Avatar>
					:
					""
			}
		</button>
	);
};

export default Cell;
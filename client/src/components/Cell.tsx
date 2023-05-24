import Apple from "src/assets/images/apple.png";
import Lemon from "src/assets/images/lemon.png";
import Pepper from "src/assets/images/pepper.png";
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
			className={ `cell ${ (!isPlayerTurn || hasEnded) ? "cell--disabled" : "" }` }
			onClick={ () => updateGameMatrix(id, avatarId) }
			disabled={ !isPlayerTurn || hasEnded }
			key={ content }
		>
			{
				content !== null
					?
					<img style={ { width: "100%" } } src={ content === 0 ? Apple : (content === 1 ? Lemon : Pepper) }></img>
					:
					""
			}
		</button>
	);
};

export default Cell;
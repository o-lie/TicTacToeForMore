import React, { useState } from 'react';
/*
function Square({ChooseSquare, val}:any)  {
	return (
		<div className='square' onClick={ChooseSquare}>
			{val}
		</div>
	);
}
*/
const GamePage = () => {
	/*
	const [board, setBoard] = useState(["","","","","","","","",""]);
	const [player, setPlayer] = useState("X");
	const [turn, setTurn] = useState("X");

	const ChooseSquare = (square:any) => {
		if (turn === player && board[square] === "" ) {
			setTurn(player === "X" ? "0" : "X");
			board.map((val, idx) => {
				if(idx === square && val === "") {
					return player
				}
			})
			setBoard(prevState => ( prevState?.map((val, idx) => {
				if(idx === square && val === "") return player;
				return val;
			})))

			setBoard(
				board.map((val, idx) => {
					if(idx === square && val === "") {
						return player;
					}
					return val;
				})
			);
		}
	};*/

	return (
		<div>hello</div>
		/*<div className="board">
			<div className="row">
				<Square ChooseSquare={() => {
					ChooseSquare(0);
				}} 
				val={[board[0]]}
				/>
				<Square ChooseSquare={() => {
					ChooseSquare(1);
				}} 
				val={[board[1]]}
				/>
				<Square ChooseSquare={() => {
					ChooseSquare(2);
				}} 
				val={[board[2]]}
				/>
			</div>
			<div className="row">
				<Square ChooseSquare={() => {
					ChooseSquare(3);
				}} 
				val={[board[3]]}
				/>
				<Square ChooseSquare={() => {
					ChooseSquare(4);
				}} 
				val={[board[4]]}
				/>
				<Square ChooseSquare={() => {
					ChooseSquare(5);
				}} 
				val={[board[5]]}
				/>
			</div>
			<div className="row">
				<Square ChooseSquare={() => {
					ChooseSquare(6);
				}} 
				val={[board[6]]}
				/>
				<Square ChooseSquare={() => {
					ChooseSquare(7);
				}} 
				val={[board[7]]}
				/>
				<Square ChooseSquare={() => {
					ChooseSquare(8);
				}} 
				val={[board[8]]}
				/>
			</div>
		</div>*/
	);
}

export default GamePage;
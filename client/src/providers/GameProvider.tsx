import { createContext } from "react";
import { GameContextType } from "src/types/types";

const defaultState: GameContextType = {
	gameState: {
		allPlayers: [],
		isConnected: false,
		hasJoined: false,
		canStart: false,
		isStarted: false,
		username: "",
		roomCode: null,
		clientCount: 0,
		avatarId: 0,
		boards: [
			{
				id: 0,
				isPlayerTurn: false,
				hasWon: false,
				hasEnded: false
			},
			{
				id: 1,
				isPlayerTurn: false,
				hasWon: false,
				hasEnded: false
			}
		]
	},
	setGameState: () => {
	}
};
export const GameContext = createContext<GameContextType>(defaultState);

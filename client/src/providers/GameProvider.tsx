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
	},
	setGameState: () => {
	}
};
export const GameContext = createContext<GameContextType>(defaultState);

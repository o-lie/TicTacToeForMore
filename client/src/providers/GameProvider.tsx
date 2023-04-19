import { createContext } from "react";
import { GameContextType } from "src/types/types";

const defaultState: GameContextType = {
	gameState: {
		isConnected: false,
		isStarted: false,
		username: ""
	},
	setGameState: () => {
	}
};
export const GameContext = createContext<GameContextType>(defaultState);

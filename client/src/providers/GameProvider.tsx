import { createContext } from "react";
import { GameContextType } from "src/types/types";
import { initialGameState } from "src/utils/constants";

const defaultState: GameContextType = {
	gameState: initialGameState,
	setGameState: () => {
	}
};
export const GameContext = createContext<GameContextType>(defaultState);

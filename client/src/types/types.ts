import { AlertColor } from "@mui/material";

export type EnumDictionary<T extends string | symbol | number, U> = {
	[K in T]: U;
};

export type SnackbarState = {
	isOpen: boolean,
	message: string,
	type: AlertColor
}

export type Player = {
	id: string,
	username: string,
	avatarId: number,
	roomCode: string
}

export type GameState = {
	allPlayers: Player[],
	isConnected: boolean,
	canStart: boolean,
	isStarted: boolean,
	hasJoined: boolean,
	username: string,
	avatarId: number,
	isPlayerTurn?: boolean[],
	roomCode: string | null,
	clientCount: number
}

export type Avatar = {
	type: AvatarTypeEnum,
	name: string,
	src: any
}

export type BoardMatrix = Array<number | null>;

export type Board = {
	id: number,
	matrix: BoardMatrix,
	isPlayerTurn: boolean,
	hasWon: boolean,
	hasEnded: boolean
}

export enum AvatarTypeEnum {
	"APPLE",
	"PEPPER",
	"LEMON"
}

export type GameContextType = {
	gameState: GameState,
	setGameState: (gameState: GameState) => void,
	setRoomCode?: (roomCode: string | null) => void
}


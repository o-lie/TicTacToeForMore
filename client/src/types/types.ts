import { AlertColor } from "@mui/material";
import Pepper from "src/assets/images/avatar-1.png";

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
	avatarId: number
}

export type GameState = {
	isConnected: boolean,
	isStarted: boolean,
	username: string,
	avatar?: Avatar
}

export type Avatar = {
	type: AvatarTypeEnum,
	name: string,
	src: any
}

export enum AvatarTypeEnum {
	"APPLE",
	"PEPPER",
	"LEMON"
}

export const avatarDictionary: EnumDictionary<AvatarTypeEnum, Avatar> = {
	[ AvatarTypeEnum.PEPPER ]:
		{
			name: "Papryka",
			type: AvatarTypeEnum.PEPPER,
			src: Pepper
		},
	[ AvatarTypeEnum.APPLE ]:
		{
			name: "Jabłko",
			type: AvatarTypeEnum.APPLE,
			src: Pepper
		},
	[ AvatarTypeEnum.LEMON ]:
		{
			name: "Cytryna",
			type: AvatarTypeEnum.LEMON,
			src: Pepper
		}
};

export type GameContextType = {
	gameState: GameState,
	setGameState?: (gameState: GameState) => void
}


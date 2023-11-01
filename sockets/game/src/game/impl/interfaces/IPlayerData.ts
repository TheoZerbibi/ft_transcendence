import { SIDE } from "src/game/engine/enums/Side";

export interface IPlayerData {
	y: number;
	score: number;
	w: number;
	h: number;
	side: SIDE;
}

import { SIDE } from "src/game/engine/enums/Side";
import { IVector } from "src/game/engine/interfaces/IVector";

export interface IPlayerData {
	pos: IVector;
	w: number;
	h: number;
	side: SIDE;
	score: number;

	move: (direction: number) => void;
}

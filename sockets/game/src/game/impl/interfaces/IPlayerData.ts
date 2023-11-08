import { SIDE } from "src/game/engine/enums/Side";
import { Vector } from "src/game/engine/utils/Vector";

export interface IPlayerData {
	pos: Vector;
	w: number;
	h: number;
	side: SIDE;
	score: number;

	move: (direction: number) => void;
}

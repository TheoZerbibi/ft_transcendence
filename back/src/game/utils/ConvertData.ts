import { GameDto } from '../dto';

export type PlayerInput = {
	player_id: number;
	game_id: number;
	score: number;
	is_win: boolean;
	is_spec: boolean;
	side: number;
	user: {
		id: number;
		login: string;
		display_name: string;
		email: string;
		dAuth: boolean;
		avatar: string;
		secret: null;
		created_at: Date;
		updated_at: Date;
		last_login: Date;
	};
};

type PlayerOutput = {
	user: {
		id: number;
		login: string;
		displayName: string;
		avatar: string;
	};
	score: number;
	side: number;
};

type GameOutput = {
	winner: PlayerOutput;
	loser: PlayerOutput;
	startDate: Date;
	endingDate: Date;
};

export function convertGameData(input: PlayerInput[], gameData: GameDto): GameOutput {
	const winner = input.find((player) => player.is_win);
	const loser = input.find((player) => !player.is_win);

	if (!winner || !loser) {
		throw new Error('Invalid game data: Missing winner or loser.');
	}

	return {
		winner: {
			user: {
				id: winner.user.id,
				login: winner.user.login,
				displayName: winner.user.display_name,
				avatar: winner.user.avatar,
			},
			score: winner.score,
			side: winner.side,
		},
		loser: {
			user: {
				id: loser.user.id,
				login: loser.user.login,
				displayName: loser.user.display_name,
				avatar: loser.user.avatar,
			},
			score: loser.score,
			side: loser.side,
		},
		startDate: gameData.started_at,
		endingDate: gameData.end_at,
	};
}

import { IGame } from './interfaces/IGame';
import { IUser } from './interfaces/IUser';

export class Game implements IGame {
	private usersInGame: Array<IUser> = [];
	public inProgress: boolean = false;

	constructor(private gameUID: string) {}

	isInProgress(): boolean {
		return this.inProgress;
	}

	getGameUID(): string {
		return this.gameUID;
	}

	addUser(user: IUser): void {
		console.log('addUser : ', user);
		this.usersInGame.push(user);
	}

	getUserInGame(): Array<IUser> {
		return this.usersInGame.filter((user) => !user.isSpec);
	}

	getSpectatorInGame(): Array<IUser> {
		return this.usersInGame.filter((user) => user.isSpec);
	}

	getAllUserInGame(): Array<IUser> {
		return this.usersInGame;
	}

	startGame(): void {
		throw new Error('Method not implemented.');
	}

	userIsInGame(userId: number): boolean {
		return this.usersInGame.some((user) => user.user.id === userId);
	}
}

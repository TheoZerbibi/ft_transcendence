import { IGame } from './interfaces/IGame';
import { IUser } from './interfaces/IUser';

export class Game implements IGame {
	private usersInGame: Array<IUser> = [];
	public inProgress: boolean = false;
	public isEnd: boolean = false;

	constructor(private gameUID: string) {}

	isInProgress(): boolean {
		return this.inProgress;
	}

	isEnded(): boolean {
		return this.isEnd;
	}

	getGameUID(): string {
		return this.gameUID;
	}

	addUser(user: IUser): void {
		this.usersInGame.push(user);
	}

	removeUser(user: IUser): void {
		this.usersInGame = this.usersInGame.filter((u) => u.user.id !== user.user.id);
	}

	getUser(userID: number) {
		return this.usersInGame.find((user) => user.user.id === userID);
	}

	getUsersInGame(): Array<IUser> {
		return this.usersInGame.filter((user) => !user.isSpec);
	}

	getSpectatorsInGame(): Array<IUser> {
		return this.usersInGame.filter((user) => user.isSpec);
	}

	getAllUsersInGame(): Array<IUser> {
		return this.usersInGame;
	}

	startGame(): void {
		this.inProgress = true;
		console.log('Game started');
		// throw new Error('Method not implemented.');
	}

	endGame(): void {
		this.isEnd = true;
		console.log('Game ended');
		// throw new Error('Method not implemented.');
	}

	userIsInGame(userId: number): boolean {
		return this.usersInGame.some((user) => user.user.id === userId);
	}

	userIsSpectator(userId: number): boolean {
		return this.usersInGame.some((user) => user.user.id === userId && user.isSpec);
	}
}

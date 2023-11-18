export interface IFriend {
	getId(): number;
	getConvId(): number;
	getUserId(): number;

	getIsBlocked(): boolean;

	setIsBlocked(isBlocked: boolean): void;
}

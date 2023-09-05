import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	displayName?: string;

	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	avatar?: string;
}

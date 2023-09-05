import { IsOptional, IsString} from 'class-validator';

export class EditUserDto {

	@IsString()
	@IsOptional()
	displayName?: string;

	@IsString()
	@IsOptional()
	avatar?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChannelUserDto } from './channel-user.dto';


export class ChannelDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;
}

export class ChannelWithUsersDto extends ChannelDto {
	@ApiProperty()
	@IsArray()
	// eslint-disable-next-line
	users: ChannelUserDto[];
}

export class CreateChannelDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;
}

export class ChannelListElemDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;
}

export class ChannelSettingsDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	id: number;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	// eslint-disable-next-line
	is_public: boolean;
}

export class ChannelModPwdDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	prev_pwd: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	new_pwd: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	new_pwd_confirm: string;
}

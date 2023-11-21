import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChannelUserDto } from './channel-user.dto';
import { ChannelMessageDto } from './channel-message.dto';

export class ChannelDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_public: boolean;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	created_at: Date;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	updated_at: Date;
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

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	updated_at: Date;
}

export class ChannelSettingsDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	// eslint-disable-next-line
	is_public: boolean;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	password: string;
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

export class createChannelUserDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	password: string;
}

export class AdminModUserDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	target_id: number;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	password: string;
}

export class PasswordRequiredActionDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	password: string;
}
import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
=======
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChannelUserDto } from './channel-user.dto';
>>>>>>> 1c3f4bd (chore: create channel)

export class ChannelDto {
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
	public: boolean;

	@ApiProperty()
	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	password: string;

	@ApiProperty()
	@IsDate()
	@IsOptional()
	// eslint-disable-next-line
<<<<<<< HEAD
	public: boolean;
}

export class ChannelUserDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	channel_id: number;

	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	user_id: number;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_owner: boolean;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_admin: boolean;

	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	is_muted: number;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_ban: boolean;
}

export class joinChannelDto extends ChannelUserDto {
	@ApiProperty()
	@IsString()
=======
	created_at: Date;

	@ApiProperty()
	@IsDate()
>>>>>>> 1c3f4bd (chore: create channel)
	@IsOptional()
	// eslint-disable-next-line
	updated_at: Date;
}
<<<<<<< HEAD
=======

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

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	password: string;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	// eslint-disable-next-line
	is_public: boolean;
}
>>>>>>> 1c3f4bd (chore: create channel)

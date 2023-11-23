import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ChannelUserDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	username: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	avatar: string;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_owner: boolean;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_admin: boolean;

	@ApiProperty()
	@IsDate()
	// eslint-disable-next-line
	is_muted: Date;

	@ApiProperty()
	@IsBoolean()
	// eslint-disable-next-line
	is_banned: boolean;
}

export class CreateChannelUserDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	// eslint-disable-next-line
	chan_password: string;
}

export class ModChannelUserDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	target_login: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	password: string;

	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	action: string;

	@ApiProperty()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
	@IsDate()
	@IsOptional()
	// eslint-disable-next-line
	muted_until: Date;
}

export class TargetInfos {
	
}
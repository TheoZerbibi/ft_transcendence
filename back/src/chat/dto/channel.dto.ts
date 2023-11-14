import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChannelUserDto } from './channel-user.dto';

export class ChannelListElemDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	name: string;
}

export class ModChannelDto extends ChannelListElemDto {
	@ApiProperty()
	@IsString()
	// eslint-disable-next-line
	password: string;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	// eslint-disable-next-line
	is_public: boolean;

	@ApiProperty()
	@IsDate()
	@IsOptional()
	// eslint-disable-next-line
	updated_at: Date;
}

export class ChannelDto extends ModChannelDto {
	@ApiProperty()
	@IsNumber()
	// eslint-disable-next-line
	id: number;

	@ApiProperty()
	@IsDate()
	@IsOptional()
	// eslint-disable-next-line
	created_at: Date;
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

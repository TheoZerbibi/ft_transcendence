// COMMON
import { UseGuards, Controller, Body, Param, Get, Patch, Post, Delete, BadRequestException, ForbiddenException } from '@nestjs/common';
// AUTH
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
// ENTITIES
import { ChannelEntity } from './impl/ChannelEntity';
import { ChannelUserEntity } from './impl/ChannelUserEntity';
// PRISMA
import { User } from '@prisma/client';
// DTO
import {
	ChannelDto,
	ChannelListElemDto,
	CreateChannelDto,
	ChannelSettingsDto,
	ChannelModPwdDto,
	PasswordRequiredActionDto,
	ChannelNameDto,
	DeleteChannelDto,
	ErrorDto,
} from './dto/channel.dto';
import { ChannelUserDto, CreateChannelUserDto, ModChannelUserDto } from './dto/channel-user.dto';
import { ChannelMessageContentDto, ChannelMessageDto } from './dto/channel-message.dto';
// SERVICES
import { ChannelService } from './channels.service';

@Controller('channel')
@ApiTags('Channel')
@ApiBearerAuth()
export class ChannelController {
	constructor(private channelService: ChannelService) {}

	/***********************************************************************************/
	/* 										Getters									   */
	/***********************************************************************************/

	/*********************************** Channels Lists ********************************/
	// Get all public channels
	@Get('list/discover')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all public channels' })
	@ApiBearerAuth('JWT-auth')
	async getAllPublicChannels(@GetUser() user: User) {
		try {
			return await this.channelService.getAllPublicChannels(user);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	//Get all channels on which user is
	@Get('list/joined')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get joined channel names' })
	@ApiBearerAuth('JWT-auth')
	async getJoinedChannelNames(@GetUser() user: User) {
		try {
			return await this.channelService.getJoinedChannelNames(user);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	@Get('list/search/:search')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Search channels' })
	@ApiBearerAuth('JWT-auth')
	async searchChannels(@GetUser() user: User, @Param('search') search: string) {
		try {
			return await this.channelService.searchChannels(user, search);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/********************************** Channel Access *********************************/
	@Get(':channel_name/access')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Access to a channel by its name' })
	@ApiBearerAuth('JWT-auth')
	async accessChannelByName(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
	) {
		try {
			return await this.channelService.accessChannelByName(user, channel_name);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/*************************************** Users ************************************/
	@Get(':channel_name/access/users')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all channel users' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelUsers(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
	) {
		try {
			return await this.channelService.getAllChannelUsers(user, channel_name);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/************************************* Messages ************************************/
	@Get(':channel_name/access/messages')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get 20 last messages from channel' })
	@ApiBearerAuth('JWT-auth')
	async getLastMessages(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
	) {
		try {
			return await this.channelService.getLastMessages(user, channel_name);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										Creation								   */
	/***********************************************************************************/

	/************************************** Channel ************************************/
	@Post('create')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Create channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async createChannel(@GetUser() user: User, @Body() dto: CreateChannelDto) {
		try {
			const channel: ChannelEntity = await this.channelService.createChannel(dto, user.id);
			this.channelService.publishOnRedis('channel-creation', JSON.stringify(channel));
			return channel;
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/*************************************** Users ************************************/
	@Post(':channel_name/join')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Add user to channel' })
	@ApiBearerAuth('JWT-auth')
	async createChannelUser(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Body() dto: CreateChannelUserDto,
	) {
		try {
			return await this.channelService.createChannelUser(user, channel_name, dto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/************************************* Messages ************************************/
	@Post(':channel_name/new_message')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Send message to channel' })
	@ApiBearerAuth('JWT-auth')
	async createChannelMessage(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Body() ChannelMessageContentDto: ChannelMessageContentDto,
	) {
		try {
			return await this.channelService.createChannelMessage(user, channel_name, ChannelMessageContentDto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/***********************************************************************************/
	/* 									Modification								   */
	/***********************************************************************************/

	/*********************************** Channel Settings ******************************/
	@Patch(':channel_name/settings/admin/general')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mod channel name & privacy' })
	@ApiBearerAuth('JWT-auth')
	async modChannel(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Body() newParamsdto: ChannelSettingsDto,
	) {
		try {
			return await this.channelService.modChannel(user, channel_name, newParamsdto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	@Patch(':channel_name/settings/owner/pwd')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mod channel pwd' })
	@ApiBearerAuth('JWT-auth')
	async modChannelPwd(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Body() channelModPwdDto: ChannelModPwdDto,
	) {
		try {
			return await this.channelService.modChannelPwd(user, channel_name, channelModPwdDto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/*************************************** Users ************************************/
	@Patch(':channel_name/settings/owner/set_user_as_admin')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Set user as admin of channel' })
	@ApiBearerAuth('JWT-auth')
	async setAdmin(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Body() dto: ModChannelUserDto,
	) {
		try {
			return await this.channelService.setChannelUserAsAdmin(user, channel_name, dto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	@Patch(':channel_name/settings/admin/mod_user')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Mute / unmute / kick / ban / unban (=kick)' })
	@ApiBearerAuth('JWT-auth')
	async muteUser(
		@GetUser() user: User,
		@Param('channel_name') channel_name: string,
		@Body() dto: ModChannelUserDto,
	) {
		try {
			return await this.channelService.modChannelUser(user, channel_name, dto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/***********************************************************************************/
	/* 									Deletion									   */
	/***********************************************************************************/

	@Delete('leave')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Leave channel' })
	@ApiBearerAuth('JWT-auth')
	async deleteChannelUser(
		@GetUser() user: User,
		@Body() dto: ChannelNameDto) {
		try {
			return await this.channelService.deleteChannelUser(user, dto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	@Delete('')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Delete channel' })
	@ApiBearerAuth('JWT-auth')
	async deleteChannel(
		@GetUser() user: User,
		@Body() dto: DeleteChannelDto,
	) {
		try {
			return await this.channelService.deleteChannel(user, dto);
		} catch (e: any) {
			if (e instanceof BadRequestException || e instanceof ForbiddenException) {
				return JSON.stringify({ is_error: true as boolean, error_message: e.message as string });
			}
			throw e;
		}
	}

	/***********************************************************************************/
	/* 										DEBUG									   */
	/***********************************************************************************/
	// DEBUG ONLY
	@Get('list/allChannelsDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all channels' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelsDebug(): Promise<ChannelEntity[]> {
		return await this.channelService.getAllChannelsDebug();
	}

	// DEBUG ONLY
	@Get('list/allChannelUsersDebug')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'For debugging purpose only : Get all channel users' })
	@ApiBearerAuth('JWT-auth')
	async getAllChannelUsersDebug(): Promise<ChannelUserEntity[]> {
		return await this.channelService.getAllChannelUsersDebug();
	}
}

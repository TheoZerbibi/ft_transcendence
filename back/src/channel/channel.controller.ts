import {
	Body,
	Post,
	Controller,
	Get,
	//BadRequestException,
	Param,
	UseGuards,
	//ClassSerializerInterceptor,
	//BadRequestException,
	Patch,
	//UseInterceptors,
	//Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
//import { UserService } from '../user/user.service';
//import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channel')
@ApiTags('Channel')
@ApiBearerAuth()
export class ChannelController {
	constructor(private channelService: ChannelService) {}

	@Get(':name')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'get channel by name' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async fetch(@Param('name') channel_name: string) {
		return this.channelService.getChannel(channel_name);
	}

	@Post('create')
	@UseGuards(JwtGuard) // Needed to access user attribute
	//@Get('create')
	@ApiOperation({ summary: 'Create channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async create(@Body() createChannelDto: CreateChannelDto, @GetUser() user: User) {
		const id: number = user.id;
		return this.channelService.create(createChannelDto, id);
	}

	@Patch('mod/:channel')
	@UseGuards(JwtGuard) // Needed to access user attribute
	//@Get('create')
	@ApiOperation({ summary: 'mod Channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async modChannel(@Body() createChannelDto: CreateChannelDto, @GetUser() user: User) {
			return null;
	}

	//@Patch('kick')
	//async kick(@Body() dto: UpdateChannelDto, @GetUser() user: User) {
	//	const channel_id = await this.channelService.prisma.channel.findUnique({
	//		where: {
	//			name: channel,
	//		},
	//	});
	//	if (!channel_id) throw new BadRequestException('Invalid channel');
	//
	//	const target_id = await this.userService.prisma.user.findUnique({
	//		where: {
	//			login: target,
	//		},
	//	});
	//	if (!channel_id) throw new BadRequestException('Invalid user');
	//
	//
	//	}
	//	const target_id = await this.channelService.prisma.channel_users.findUnique({
	//		where: {
	//			channel_id: channel_id,
	//			user: channel,
	//		},
	//	});
	//	return this.channelService.kick(channel_id,
	//}

	findAll() {
		return this.channelService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.channelService.findOne(+id);
	}

	//@Patch(':id')
	//update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
	//  return this.channelService.update(+id, updateChannelDto);
	//}

	//	@Delete('delete/:channel')
	//	remove(@Param('channel') name: string) {
	//	return this.channelService.remove(+name);
	//}
}

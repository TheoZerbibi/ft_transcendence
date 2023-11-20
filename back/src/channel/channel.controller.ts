import {
	Body,
	Post,
	Controller,
	Get,
	//BadRequestException,
	Param,
	UseGuards,
	//ClassSerializerInterceptor,
	BadRequestException,
	Patch,
	//UseInterceptors,
	//Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ChannelService } from './channel.service';
import { CreateChannelDto, CreateChannelMessageDto } from './dto/create-channel.dto';
import { User, ChannelUser } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForbiddenException } from '@nestjs/common';
import { ChannelDto, ChannelUserDto } from './dto/channel.dto';
//import { UserService } from '../user/user.service';
//import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channel')
@ApiTags('Channel')
@ApiBearerAuth()
export class ChannelController {
	constructor(private channelService: ChannelService) {}

	@Post('create')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Create channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async create(@Body() createChannelDto: CreateChannelDto, @GetUser() user: User) {
		const id: number = user.id;
		return this.channelService.create(createChannelDto, id);
	}

	@Post('msg')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Post-message' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async message(@GetUser() me: User, @Body()dto: CreateChannelMessageDto)
	{

		return await this.channelService.postMessage(me, dto.channel_id, dto.content);
	}

	@Get('all')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'FetchAllChannel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async all() {
		return await this.channelService.findAll();
	}

	@Get(':name')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get channel by Name' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async getChannelByName(@Param('name') channel_name: string) {
		return this.channelService.getChannel(channel_name);
	}

	@Get(':id')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get channel by Id' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async getChannelById(@Param('id') channel_id: number, @GetUser() user: User) {
		return this.channelService.getChannelById(channel_id);
	}


	@Get(':channel/users')
	async getChannelUsers(@GetUser() user: User, @Param('channel') channel_name: string)
	{
		return await this.channelService.getChannelUsers(user, channel_name);
	}

	//Get all user in a channel
	@Get(':channel/user')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'retrieve user of channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async	allChannelUsers(@Param('channel') channel_name: string, @GetUser() user: User): Promise<ChannelUser[] | null>
	{
		const channel: ChannelDto | undefined = await this.channelService.getChannel(channel_name);

		if (!channel) throw new BadRequestException('Channel don\'t exist\n');
		return  this.channelService.getChannelUsers(user, channel.name);
	}


	//Get all msg in a channel (for debbugging purpose only)
	@Get(':channel/msg')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async getChannelMsg()
	

	@Get('allUser')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async allUsers() {
		return this.channelService.getAllUser();
	}

<<<<<<< HEAD

	//Get all user in a channel
	@Get(':channel/user')
=======
	@Patch('mod/:channel')
>>>>>>> dd0b860 (fix: Fix for rebase)
	@UseGuards(JwtGuard) // Needed to access user attribute
	//@Get('create')
	@ApiOperation({ summary: 'mod Channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
<<<<<<< HEAD
	async	allChannelUsers(@Param('channel') channel_name: string, @GetUser() user: User): Promise<ChannelUser>
	{
		const channel: ChannelDto | undefined = await this.channelService.getChannel(channel_name);
		if (!channel) throw new BadRequestException('Channel don\'t exist\n');
		return  this.channelService.getChannelUser(user, channel.name);
	}

	@Patch('mod/:channel')
	@UseGuards(JwtGuard) // Needed to access user attribute
	//@Get('create')
	@ApiOperation({ summary: 'mod Channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async modChannel(@Body() createChannelDto: CreateChannelDto, @GetUser() user: User) {
		console.log(createChannelDto);
		console.log(user);
		return null;
	}

=======
	async modChannel(@Body() createChannelDto: CreateChannelDto, @GetUser() user: User) {
		console.log(createChannelDto);
		console.log(user);
		return null;
	}

>>>>>>> dd0b860 (fix: Fix for rebase)
	@Patch(':mod/:user/')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get all accessible channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
<<<<<<< HEAD
	updateUser(@GetUser() user: User, @Param('user') target: string, @Param('mod') mod: string)
=======
	updateUser(@Body() dto: updateChannelUserDto, @GetUser() user: User, @Param('user') target: string)
>>>>>>> dd0b860 (fix: Fix for rebase)
	{
		if (mod !== "kick" && mod !== "mute" && mod !== "ban") throw new ForbiddenException(mod + ': Unknown channel moderation on a user');

		return null;
	}

<<<<<<< HEAD
=======
	//POST MESSAGE
	//
	//
	//
	//
	//
>>>>>>> dd0b860 (fix: Fix for rebase)
	//@Patch(':id')
	//update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
	//  return this.channelService.update(+id, updateChannelDto);
	//}
	//	@Delete('delete/:channel')
	//	remove(@Param('channel') name: string) {
	//	return this.channelService.remove(+name);
	//}
}

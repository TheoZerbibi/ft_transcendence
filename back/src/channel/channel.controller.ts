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
import { ChannelMessage } from '@prisma/client';
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
	@ApiOperation({ summary: 'FetchAllChannel: for debugging purpose only' })
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


	//Get all user in a channel
	@Get('allUser')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async allUsers() {
		return this.channelService.getAllUser();
	}


	//Get all user in a channel
	@Get(':channel/user')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'retrieve user of channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async	allChannelUsers(@Param('channel') channel_name: string, @GetUser() user: User): Promise<ChannelUser[] | null>
	{
		const channel: ChannelDto | null = await this.channelService.getChannel(channel_name);

		if (!channel) throw new BadRequestException('Channel don\'t exist\n');
		return  this.channelService.getChannelUsers(user, channel.name);
	}


	@Get(':channel/user')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'retrieve user of channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async	allChannelUsers(@GetUser(@Param('channel'), channel_name: string) user: User): Promise<ChannelUser>
	{
		const channel: ChannelDto | undefined = await this.channelService.getChannel(channel_name);
		if (!channel) throw new BadRequestException('Channel don\'t exist\n');
		return  await this.channelService.getChannelUser(user, channel.name);
	}

	@Patch('mod/channel')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'mod Channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async modChannel(@Body() dto: CreateChannelDto, @GetUser() me: User) {

		return await this.channelService.modChannel(dto, me);
	}


	// TODO
	
	@Patch('mod/user')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get all accessible channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	updateUser(@Body() dto: updateChannelUserDto, @GetUser() user: User): Promise<boolean>
	{
		return null;
	}


	@Get('public')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get all public channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async public()
	{
		return null;
	}
	

	// Get all channel where there is a channel User attached to it
	@Get('subscribed')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get all channel i subscribed to' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async subscribed(@GetUser() me: User): Promise<ChannelUser>
	{
		return null;
	}

	@Post('join')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Join a channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async join(@GetUser() me: User, @Body() dto: ChannelDto): Promise<ChannelUser | null>
	{
		return null;
	}

	//Get all msg in a channel: if you are banned you can't access it
	@Get('msg')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async getChannelMsg(@GetUser() me: User, @Body() channel: ChannelDto): Promise<channelMessage[] | null>
	{
		//
		return null;
	}

	@Delete('delete')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Delete Channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async delete(@GetUser() me: User, @Body() channel: ChannelDto): Promise<boolean>
	{
		return false;
	}

	//Delete channel User of me.id and channel_id:id
	@Delete('leave')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async leave(@GetUser() me: User, @Body() channel: ChannelDto): Promise<boolean>
	{
		return false;
	}
}

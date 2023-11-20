import {
	Body,
	Post,
	Controller,
	Get,
	Param,
	UseGuards,
	//ClassSerializerInterceptor,
	BadRequestException,
	Patch,
	//UseInterceptors,
	Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ChannelService } from './channel.service';
import { CreateChannelDto, CreateChannelMessageDto } from './dto/create-channel.dto';
import { User, ChannelUser } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForbiddenException } from '@nestjs/common';
import { ChannelDto, ChannelUserDto } from './dto/channel.dto';
import { UpdateChannelDto, UpdateChannelUserDto } from './dto/update-channel.dto';
//import { UserService } from '../user/user.service';
//import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channel')
@ApiTags('Channel')
@ApiBearerAuth()
export class ChannelController {
	constructor(private channelService: ChannelService) {}

	/*********************************************/
	/* 					Creation				 */
	/*********************************************/
	@Post('create')
	@UseGuards(JwtGuard) // Needed to access user attribute
	@ApiOperation({ summary: 'Create channel' })
	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
	async create(@GetUser() user: User, @Body() dto: CreateChannelDto) {
		const id: number = user.id;
		return await this.channelService.create(dto, id);
	}

	/*********************************************/
	/* 					Message					 */
	/*********************************************/

	@Post('msg')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Post message' })
	@ApiBearerAuth('JWT-auth')
	async message(@GetUser() author: User, @Body() dto: CreateChannelMessageDto) {
		return await this.channelService.postMessage(author, dto.channel_id, dto.content);
	}

	/*********************************************/
	/* 					Getters					 */
	/*********************************************/

	@Get(':name')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get channel by Name' })
	@ApiBearerAuth('JWT-auth')
	async getChannelByName(@Param('name') channel_name: string) {
		return await this.channelService.getChannelByName(channel_name);
	}

	@Get(':id')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get channel by Id' })
	@ApiBearerAuth('JWT-auth')
	async getChannelById(@Param('id') channel_id: number, @GetUser() user: User) {
		return await this.channelService.getChannelById(channel_id);
	}

	//Get all user in a channel
	@Get(':channel/users')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth')
	async allUsers() {
		return await this.channelService.getAllUsers();
	}

	//Get all user in a channel
	@Get(':channel/user')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'retrieve user of channel' })
	@ApiBearerAuth('JWT-auth')
	async allChannelUsers(
		@Param('channel') channel_name: string,
		@GetUser() user: User,
	): Promise<ChannelUser[] | null> {
		const channel: ChannelDto | null = await this.channelService.getChannelByName(channel_name);

		if (!channel) throw new BadRequestException("Channel doesn't exist\n");
		return await this.channelService.getChannelUsers(user, channel.name);
	}

<<<<<<< HEAD

//	@Get(':channel/user')
//	@UseGuards(JwtGuard) // Needed to access user attribute
//	@ApiOperation({ summary: 'retrieve user of channel' })
//	@ApiBearerAuth('JWT-auth') // Needed to Authentify in service
//	async	allChannelUsers(@GetUser() user: User, @Param('channel') channel_name: string): Promise<ChannelUser>
//	{
//		const channel: ChannelDto | undefined = await this.channelService.getChannel(channel_name);
//		if (!channel) throw new BadRequestException('Channel don\'t exist\n');
//		return  await this.channelService.getChannelUser(user, channel.name);
//	}

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
=======
	@Patch('mod/channel')
	@UseGuards(JwtGuard)
>>>>>>> 0a8c0ed (fix: Fix for rebase)
	@ApiOperation({ summary: 'mod Channel' })
	@ApiBearerAuth('JWT-auth')
	async modChannel(@Body() dto: UpdateChannelDto, @GetUser() author: User) {
		return await this.channelService.modChannel(dto, author);
	}

<<<<<<< HEAD
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
<<<<<<< HEAD
	updateUser(@GetUser() user: User, @Param('user') target: string, @Param('mod') mod: string)
=======
	updateUser(@Body() dto: updateChannelUserDto, @GetUser() user: User, @Param('user') target: string)
>>>>>>> dd0b860 (fix: Fix for rebase)
=======
	updateUser(@Body() dto: UpdateChannelUserDto, @GetUser() user: User): Promise<boolean>
>>>>>>> 8b07d1f (fix: Fix for rebase)
	{
		if (mod !== "kick" && mod !== "mute" && mod !== "ban") throw new ForbiddenException(mod + ': Unknown channel moderation on a user');

		return null;
	}

<<<<<<< HEAD
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
=======

=======
	// TODO
	@Patch('mod/user')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all accessible channel' })
	@ApiBearerAuth('JWT-auth')
	updateUser(@Body() dto: UpdateChannelUserDto, @GetUser() user: User): Promise<boolean> {
		return null;
	}

>>>>>>> 0a8c0ed (fix: Fix for rebase)
	@Get('public')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all public channel' })
	@ApiBearerAuth('JWT-auth')
	async public() {
		return null;
	}

	// Get all channel where there is a channel User attached to it
	@Get('subscribed')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all channel i subscribed to' })
	@ApiBearerAuth('JWT-auth')
	async subscribed(@GetUser() author: User): Promise<ChannelUser> {
		return null;
	}

	@Post('join')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Join a channel' })
	@ApiBearerAuth('JWT-auth')
	async join(@GetUser() author: User, @Body() dto: ChannelDto): Promise<ChannelUser | null> {
		return null;
	}

	//Get all msg in a channel: if you are banned you can't access it
	@Get('msg')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth')
	async getChannelMsg(@GetUser() author: User, @Body() channel: ChannelDto): Promise<ChannelMessage[] | null> {
		return null;
	}

	@Delete('delete')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Delete Channel' })
	@ApiBearerAuth('JWT-auth')
	async delete(@GetUser() author: User, @Body() channel: ChannelDto): Promise<boolean> {
		return false;
	}

	//Delete channel User of author.id and channel_id:id
	@Delete('leave')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'Get all accessible channel user' })
	@ApiBearerAuth('JWT-auth')
	async leave(@GetUser() author: User, @Body() channel: ChannelDto): Promise<boolean> {
		return false;
	}
<<<<<<< HEAD
>>>>>>> 8b07d1f (fix: Fix for rebase)
=======

	/*********************************************/
	/*											 */
	/* 			Debugging purpose only			 */
	/*											 */
	/*********************************************/

	@Get('all')
	@UseGuards(JwtGuard)
	@ApiOperation({ summary: 'FetchAllChannel: for debugging purpose only' })
	@ApiBearerAuth('JWT-auth')
	async all() {
		return await this.channelService.findAllPublic();
	}
>>>>>>> 0a8c0ed (fix: Fix for rebase)
}

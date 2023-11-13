import {
	//Body,
	Controller,
	//HttpCode,
	//HttpStatus,
	//Post
} from '@nestjs/common';
import {
	//ApiOperation,
	ApiTags,
} from '@nestjs/swagger'; //import { JwtService } from '@nestjs/jwt';
//import { ChannelDto, ChannelUserDto } from './dto/createChannel.dto';
import { ChatService } from './chat.service';

@Controller('chat')
@ApiTags('chat')
export class ChatController {
	constructor(private chatService: ChatService) {}

	//	@Post('createChannel')
	//	@HttpCode(HttpStatus.CREATED)
	//	@ApiOperation({ summary: 'Create a new Channel'})
	//	async	createChannel(@Body() dto: ChannelDto, id: number)
	//	{
	//		return this.chatService.createChannel(dto, id);
	//	}
}

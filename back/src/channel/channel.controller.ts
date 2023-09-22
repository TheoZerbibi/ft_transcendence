import {
	BadRequestException,
	Body,
	Post,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	Patch,
	UseGuards,
	UseInterceptors,
	Delete
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('channel')
@ApiTags('Channel')
@ApiBearerAuth()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post('create')
  @UseGuards(JwtGuard) // Needed to access user attribute
//  @Get('create')
  @ApiOperation({ summary: 'Create channel' })
  @ApiBearerAuth('JWT-auth') // Needed to Authentify in service
  async create(@Body() createChannelDto: CreateChannelDto, @GetUser() user: User){
	  const id: number = user.id;
    return this.channelService.create(createChannelDto, id);
  }

  @Get()
  findAll() {
    return this.channelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelService.update(+id, updateChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelService.remove(+id);
  }
}

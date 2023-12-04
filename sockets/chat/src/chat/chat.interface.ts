import { Socket } from 'socket.io'
import { PrismaService } from 'src/prisma/prisma.service';

import { users, channel_users, channels } from '@prisma/client';

interface Channel {
  users: User[];
  id: number;

  getUsers(): User[];
  getUsersSocket(): Socket[];
  setUsers(users: User[]): void;
  getId(): number;
  addUser(user: User): void;
}

interface ChannelConstructor {
  new (id: number, user: User): Channel;
  createArray(channels: number[], user: User): Channel[];
}

interface User {
  socket: Socket;
  id: number;
  channels: Channel[];

  getSocket(): Socket;
  getId(): number;
  getChannels(): Channel[];
}

interface UserConstructor {
  new (socket: Socket, id: number, channels: Channel[]): User;
}

interface Chat {
  channel_lst: Channel[];
  user_lst: User[];

  getChannels(): Channel[];
  getUsers(): User[];
  getChannelConnectedUser(channelID: number): Socket[];
  addUser(socket: Socket, userid: number, channels_usr: channel_users[]): void;
  addChannel(channelId: number, user: User): void;
  addUserToChannel(channelId: number, user: User): void;
  removeUser(socket: Socket): User;
  removeChannel(): void;
}

interface ChatConstructor {
  new (prismaService: PrismaService): Chat;
}


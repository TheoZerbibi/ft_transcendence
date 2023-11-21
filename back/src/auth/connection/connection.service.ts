import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Connection } from './connection.entity';
import { UserDto } from 'src/user/dto';

@Injectable()
export class ConnectionService {
	constructor(@InjectRepository(Connection) private readonly connectionRepository: Repository<Connection>) {}

	async get(where: any, relations = [] as string[]): Promise<Connection> {
		try {
			const con = await this.connectionRepository.findOne({ where, relations });
			return con;
		} catch (e) {
			return null;
		}
	}

	async create(_user: UserDto, _user42ID: number): Promise<Connection> {
		try {
			const con = this.connectionRepository.create();
			con.user = _user;
			con.user42ID = _user42ID;
			await con.save();
			return con;
		} catch (error) {}
		return null;
	}

	async update(connectionID: number, data: any): Promise<any> {
		try {
			await this.connectionRepository.update(connectionID, data);
		} catch (error: any) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	setTwoFactorSecret(connection: Connection, secret: string) {
		connection.otpSecret = secret;
		connection.save();
	}

	async removeOne(conn: Connection): Promise<void> {
		this.connectionRepository.remove(conn);
	}
}

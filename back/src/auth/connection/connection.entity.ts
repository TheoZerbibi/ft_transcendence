import { UserDto } from 'src/user/dto';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Connection extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne((type) => UserDto, { onDelete: 'CASCADE', eager: true, cascade: true })
	@JoinColumn()
	user: UserDto;

	@Column({ nullable: true })
	user42ID: number;

	@Column({ default: false })
	twoFactorEnabled: boolean;

	// ONE TIME PASSWORD FOR 2FA
	@Column({ nullable: true })
	otpSecret: string;
}

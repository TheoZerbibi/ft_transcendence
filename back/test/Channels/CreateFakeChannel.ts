import { PrismaClient } from '@prisma/client';

/**
 * - FakeUsers -
 * This script is used to create mutiple users by injecting predefined user data
 * into the database with Prisma. This script is used in unit test case.
 */

const prisma = new PrismaClient();

interface Channel {
	id: number;
	name: string;
	public: boolean;
	password: string;
	created_at: Date;
	updated_at: Date;
}

async function main() {
	await prisma.channel.create({
		data: {
			name: 'POISSON POISSON POISSON 🐟🐟🐟',
		}
	})
	.then( async (channel: Channel) => {
		const user = await prisma.user.create({
			data: {
				login: 'norminet',
				display_name: 'Norminet',
				email: 'norminet@student.42.fr',
				avatar: 'https://i.redd.it/sky2ka084ns11.jpg',
				channelUser: {
					create: {
						channel_id: channel.id,
						is_owner: true,
						is_admin: true,
						channelMessage: {
							create: {
								content: 'I wan\'t some fish !',
							}
						}
					}
				}
			},
		}).catch(console.error);
		console.log(user, channel);
	})
	.catch(console.error);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

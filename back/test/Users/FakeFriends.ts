import { PrismaClient, User } from '@prisma/client';
import { get } from 'http';

/**
 * - FakeUsers -
 * This script is used to create mutiple users by injecting predefined user data
 * into the database with Prisma. This script is used in unit test case.
 */

const prisma = new PrismaClient();
const users = [
	{
		login: 'norminet',
		display_name: 'Norminet',
		email: 'norminet@student.42.fr',
		avatar: 'https://pbs.twimg.com/profile_images/1150849282913779713/piO0pkT5_400x400.jpg',
	},
	{
		login: 'garfield',
		display_name: 'Garfield',
		email: 'garfield@student.42.fr ',
		avatar: 'https://actualitte.com/uploads/images/image-garfield-3-61e9833328fb2324367938.jpg',
	},
];

async function getUser(login: string): Promise<User> {
	try {
		const user = await prisma.user.findUnique({
			where: {
				login: login,
			},
		});
		if (!user) return null;
		return user;
	} catch (e) {
		throw e;
	}
}

async function getFriends() {
	try {
		const norminet = await getUser('norminet');
		if (!norminet) return;
		const friends = await prisma.friends.findMany({
			where: {
				OR: [
					{
						user_id: norminet.id,
					},
					{
						friend_id: norminet.id,
					},
				],
			},
			include: {
				user: true,
				friend: true,
			},
		});
		console.log(friends);
	} catch (e) {
		console.error(e);
	}
}

async function makeFriends() {
	const norminet: User = await getUser('norminet');
	const garfield: User = await getUser('garfield');
	if (!norminet || !garfield) return;
	try {
		const alreadyFriends = await prisma.friends.findUnique({
			where: {
				user_id_friend_id: {
					user_id: norminet.id,
					friend_id: garfield.id,
				},
			},
		});
		if (alreadyFriends) return;
	} catch (e) {
		console.error(e);
		return;
	}
	try {
		await prisma.friends.create({
			data: {
				user_id: norminet.id,
				friend_id: garfield.id,
			},
		});
	} catch (e) {
		console.error(e);
		return;
	}
}

async function main() {
	const norminet: User = await getUser('norminet');
	const garfield: User = await getUser('garfield');
	if (!norminet) await prisma.user.create({ data: users[0] }).catch(console.error);
	if (!garfield) await prisma.user.create({ data: users[1] }).catch(console.error);
	await makeFriends();
	await getFriends();
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

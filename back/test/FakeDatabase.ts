import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();
const users = [
	{
		login: 'nfauconn',
		display_name: 'Noemi',
		email: 'nfauconn@student.42.fr',
		avatar: 'https://cdn.intra.42.fr/users/96c6292bd2445ca46c9ce03ddb6f8572/nfauconn.jpg',
	},
	{
		login: 'thzeribi',
		display_name: 'Theo',
		email: 'thzeribi@student.42.fr',
		avatar: 'https://cdn.intra.42.fr/users/ef89183628c15b9229bf141ebd455ba9/thzeribi.jpg',
	},
	{
		login: 'iguidado',
		display_name: 'Ismael',
		email: 'iguidado@student.42.fr ',
		avatar: 'https://cdn.intra.42.fr/users/166ae900b2c48bda6db10199f5b1efb4/iguidado.jpg',
	},
	{
		login: 'grannou',
		display_name: 'Gaëlle',
		email: 'grannou@student.42.fr',
		avatar: 'https://cdn.intra.42.fr/users/c2b48b00d1529ccb8e7a4296ec23b8ee/grannou.jpg',
	},
	{
		login: 'seozcan',
		display_name: 'Semiha',
		email: 'seozcan@student.42.fr',
		avatar: 'https://cdn.intra.42.fr/users/d78eaeaafd38e03543f1c757ad8b070e/seozcan.jpg',
	},
	{
		login: 'athierry',
		display_name: 'la termite',
		email: 'athierry@student.42.fr',
		avatar: 'https://cdn.intra.42.fr/users/7a8f6a1b6b4b5b8b2c3c7e5d5f7b1a6a/athierry.jpg',
	},
	{
		login: 'athirion',
		display_name: 'archi',
		email: '',
		avatar: 'https://cdn.intra.42.fr/users/8b1e3f9b1e3e0e9c8e3f8e3e0e9c8e3f/athirion.jpg',
	},
	{
		login: 'elmaleuv',
		display_name: 'elise',
		email: '',
		avatar: 'https://cdn.intra.42.fr/users/8b1e3f9b1e3e0e9c8e3f8e3e0e9c8e3f/elmaleuv.jpg',
	},
	{
		login: 'jgambard',
		display_name: 'josiane',
		email: '',
		avatar: 'https://cdn.intra.42.fr/users/8b1e3f9b1e3e0e9c8e3f8e3e0e9c8e3f/jgambard.jpg',
	},
	{
		login: 'fleger',
		display_name: 'fleur',
		email: '',
		avatar: 'https://cdn.intra.42.fr/users/8b1e3f9b1e3e0e9c8e3f8e3e0e9c8e3f/fleger.jpg',
	},
	{
		login: 'zminhas',
		display_name: 'zakaria',
		email: '',
		avatar: 'https://cdn.intra.42.fr/users/8b1e3f9b1e3e0e9c8e3f8e3e0e9c8e3f/zminhas.jpg',
	},
	{
		login: 'mle-roy',
		display_name: 'mune',
		email: '',
		avatar: 'https://cdn.intra.42.fr/users/8b1e3f9b1e3e0e9c8e3f8e3e0e9c8e3f/mle-roy.jpg',
	},
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

enum FriendStatus {
	DECLINED,
	PENDING,
	ACCEPTED,
}

const friends = [
	{
		user_id: 1,
		friend_id: 5,
		status: FriendStatus.ACCEPTED,
	},
	{
		user_id: 1,
		friend_id: 7,
		status: FriendStatus.ACCEPTED,
	},
	{
		user_id: 1,
		friend_id: 8,
		status: FriendStatus.ACCEPTED,
	},
	{
		user_id: 1,
		friend_id: 9,
		status: FriendStatus.PENDING,
	},
	{
		user_id: 1,
		friend_id: 10,
		status: FriendStatus.PENDING,
	},
	{
		user_id: 11,
		friend_id: 1,
		status: FriendStatus.PENDING,
	},
	{
		user_id: 12,
		friend_id: 1,
		status: FriendStatus.PENDING,
	},
];

async function main() {
	try {
		for (const user of users) {
			const existingUser = await prisma.user.findUnique({ where: { login: user.login } });
			if (!existingUser) {
				await prisma.user.create({ data: user });
			}
		}
		await prisma.friends.createMany({ data: friends }).then(console.log).catch(console.error);

		const channelNames = [
			'LO PO BIA',
			'HA',
			'KHUN',
			'FUG',
			'JAHAD',
			'UREK',
			'name',
			'bla',
			'fdsfads',
			'kkkkkkkk',
			'fjdsaf',
			'fdsahg',
			'dasghkhjdkaslhfjd',
		];

		for (let i = 0; i < 13; i++) {
			const channelName = channelNames[i % channelNames.length];

			await prisma.channel.create({
				data: {
					name: channelName,
					public: true,
					channelUser: {
						create: {
							user_id: 1,
							is_owner: true,
							is_admin: true,
							channelMessage: {
								create: {
									content: 'hhh',
								},
							},
						},
					},
				},
			});
		}
	} catch (e) {
		console.error(e);
	}
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

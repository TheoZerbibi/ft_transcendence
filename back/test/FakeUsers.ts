import { PrismaClient } from '@prisma/client';

/**
 * - FakeUsers -
 * This script is used to create mutiple users by injecting predefined user data
 * into the database with Prisma. This script is used in unit test case.
 */

const prisma = new PrismaClient();
const users = [
	{
		username: 'Theo',
		email: 'thzeribi@student.42.fr',
		avatar: 'https://cdn.intra.42.fr/users/ef89183628c15b9229bf141ebd455ba9/thzeribi.jpg',
	},
	{
		username: 'Ismael',
		email: 'iguidado@student.42.fr ',
		avatar: 'https://cdn.intra.42.fr/users/166ae900b2c48bda6db10199f5b1efb4/iguidado.jpg',
	},
	{
		username: 'Gaëlle',
		email: 'grannou@student.42.fr',
		avatar: 'https://cdn.intra.42.fr/users/c2b48b00d1529ccb8e7a4296ec23b8ee/grannou.jpg',
	},
	{
		username: 'Semiha',
		email: 'seozcan@student.42.fr',
		avatar: 'https://cdn.intra.42.fr/users/d78eaeaafd38e03543f1c757ad8b070e/seozcan.jpg',
	},
	{
		username: 'Noemi',
		email: 'nfauconn@student.42.fr',
		avatar: 'https://cdn.intra.42.fr/users/96c6292bd2445ca46c9ce03ddb6f8572/nfauconn.jpg',
	},
];
async function main() {
	await prisma.user.createMany({ data: users }).then(console.log).catch(console.error);
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

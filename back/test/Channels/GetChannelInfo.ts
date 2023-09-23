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
	const userId = 1;

	const result = await prisma.$queryRawUnsafe(
		`SELECT DISTINCT * 
		FROM channel_messages cm
		LEFT JOIN channel_users cu ON cu.id = cm.channel_user_id
		LEFT JOIN channels channel ON channel.id = cu.channel_id
		LEFT JOIN users ON users.id = cu.user_id
		WHERE users.id = $1
		ORDER BY cm.created_at;`,
		userId
	)
	console.log(result);
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

import { createPool } from '@vercel/postgres';
import { sql } from '@vercel/postgres';

export async function load() {
	const db = createPool();
	const startTime = Date.now();

	try {
		const { rows: users } = await db.query('SELECT * FROM users');
		const duration = Date.now() - startTime;
		return {
			users: users,
			duration: duration,
		};
	} catch (error) {
		console.log('Error: ', error);
	}
}

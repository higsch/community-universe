import { createPool } from '@vercel/postgres';
import { sql } from '@vercel/postgres';

const addBadge = async (data = []) => {
	const createTable = await sql`
    CREATE TABLE IF NOT EXISTS badges (
      id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL,
      data VARCHAR(255) NOT NULL
    );
  `;

	const badge = await sql`
		INSERT INTO badges (user_id, data) VALUES (0, ${data.join(',')});
	`;

	return {
		createTable,
		badge,
	};
};

export async function load() {
	const db = createPool();
	const startTime = Date.now();

	try {
		// const { rows: users } = await db.query('SELECT * FROM users');
		const duration = Date.now() - startTime;
		return {
			// users: users,
			duration: duration,
		};
	} catch (error) {
		console.log('Error: ', error);
	}
}

export const actions = {
	addBadge: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log(data);
		// const email = data.get('email');
		// const password = data.get('password');
		await addBadge([0, 0, 0, 0, 0, 0, 0, 0, 0]);

		return { success: true };
	},
};

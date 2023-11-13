import { createPool } from '@vercel/postgres';
import { sql } from '@vercel/postgres';

const addBadge = async (data = '0,0,0,0,0,0,0,0,0') => {
	const createTable = await sql`
    CREATE TABLE IF NOT EXISTS badges (
      id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL,
      data VARCHAR(255) NOT NULL
    );
  `;

	const badge = await sql`
		INSERT INTO badges (user_id, data) VALUES (0, ${data});
	`;

	return {
		createTable,
		badge,
	};
};

export async function load() {
	const pool = createPool();
	try {
		const { rows } = await pool.query('SELECT * FROM badges');
		const badges = rows.map((row) => {
			return {
				...row,
				data: row.data.split(',').map((d) => +d) || [],
			};
		});
		return {
			badges,
		};
	} catch (error) {
		console.log('Error: ', error);
	}
}

export const actions = {
	addBadge: async ({ cookies, request }) => {
		const data = await request.formData();
		const values = data.get('values');

		await addBadge(`${values}`);

		return { success: true };
	},
};

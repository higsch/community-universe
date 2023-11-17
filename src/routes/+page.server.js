import { createPool } from '@vercel/postgres';
import { sql } from '@vercel/postgres';
import { csvParse, autoType } from 'd3';

import {
	personalityPath,
	finalStarAlenka,
	finalStarMatthias,
} from '$utils/config';

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

const loadBadges = async () => {
	const pool = createPool();
	try {
		const { rows } = await pool.query('SELECT * FROM badges');
		let badges = rows.map((row) => {
			return {
				...row,
				data: row.data.split(',').map((d) => +d) || [],
			};
		});
		badges = [
			...badges,
			{ id: -1, user_id: -1, data: finalStarAlenka, user_name: 'Alenka' },
			{ id: -2, user_id: -2, data: finalStarMatthias, user_name: 'Matthias' },
		];
		return badges;
	} catch (error) {
		console.log('Error: ', error);
		return [];
	}
};

const loadPersonalities = async (fetch) => {
	try {
		const res = await fetch(personalityPath);
		const text = await res.text();
		const data = csvParse(text, autoType);
		return data;
	} catch (error) {
		console.log('Error: ', error);
		return [];
	}
};

export const load = async ({ fetch }) => {
	const [badges, personalities] = await Promise.all([
		loadBadges(),
		loadPersonalities(fetch),
	]);

	return {
		badges,
		personalities,
	};
};

export const actions = {
	addBadge: async ({ cookies, request }) => {
		const data = await request.formData();
		const values = data.get('values');

		await addBadge(`${values}`);

		return { success: true };
	},
};

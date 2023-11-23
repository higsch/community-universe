import { createPool } from '@vercel/postgres';
import { sql } from '@vercel/postgres';
import { csvParse, autoType } from 'd3';
import { z } from 'zod';

import {
	personalityPath,
	finalStarAlenka,
	finalStarMatthias,
} from '$utils/config';

const UserSchema = z.object({
	data: z.string(),
	user_name: z.string(),
	user_id: z.string(),
});

const addBadge = async ({data = '0,0,0,0,0,0,0,0,0', user_name, user_id}) => {
	const createTable = await sql`
    CREATE TABLE IF NOT EXISTS badges (
      id SERIAL PRIMARY KEY,
			user_id VARCHAR(255) NOT NULL,
			user_name VARCHAR(255) NOT NULL,
      data VARCHAR(255) NOT NULL
    );
  `;

	const badge = await sql`
		INSERT INTO badges (user_id, user_name, data) VALUES (${user_id}, ${user_name}, ${data});
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
			{ id: -1, user_id: '-1', data: finalStarAlenka, user_name: 'Alenka' },
			{ id: -2, user_id: '-1', data: finalStarMatthias, user_name: 'Matthias' },
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
		const values = String(data.get('values'));
		const userName = String(data.get('user_name')) || '';
		const uuid = String(data.get('user_id'));

		const badge = {
			data: values,
			user_name: userName,
			user_id: uuid,
		};

		const safeParse = UserSchema.safeParse(badge);

		if (safeParse.success) {
			await addBadge(safeParse.data);

			return { success: true };
		}
	},
	loadBadges: async () => {
		const badges = await loadBadges();
		return { badges };
	},
};

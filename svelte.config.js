import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$utils: 'src/utils',
		},
		csrf: {
			checkOrigin: process.env.NODE_ENV === 'development' ? false : true,
		},
	},
	preprocess: vitePreprocess(),
};

export default config;

import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
      $utils: "src/utils",
    },
		csrf: { checkOrigin: false }, //TODO: remove
	},
	preprocess: vitePreprocess(),
};

export default config;

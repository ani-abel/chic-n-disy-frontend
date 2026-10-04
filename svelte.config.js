// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter({
			// ===> Vercel
			runtime: 'nodejs24.x'
		}),
		// adapter: adapter(), // ===> default sveltekit adapter

		prerender: {
			entries: ['*'],
			handleMissingId: 'warn'
		}
	}
};

export default config;

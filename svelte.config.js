import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false,
		},
	},
	server: {
		origin: 'https://chat.unifi.karstensiemer.de'
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;

import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	build: {
		target: 'esnext'
	},
	server: {
		origin: 'https://chat.unifi.karstensiemer.de'
	},
	csrf: {
		checkOrigin: false,
		check_origin: false
	}
};

export default config;

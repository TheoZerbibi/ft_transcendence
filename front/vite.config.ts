import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => {
						return tag.startsWith('ion-'); // (return true)
					},
				},
			},
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				includePaths: ['node_modules'],
			},
		},
	},
	define: {
		HOST: `"${process.env.HOST}"`,
		PORT: `"${process.env.PORT}"`,
		API: `"${process.env.API_PORT}"`,
		GAME_SOCKET: `"${process.env.GAME_SOCKET}"`,
		CHAT_SOCKET: `"${process.env.CHAT_SOCKET}"`,
		JWT: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTY5Mjc4MjUsImV4cCI6MTY5NzAxNDIyNX0.ZfjYmb1Q9BwaH_8T6WeAekdz_ZE2E6lCrhWXMDSzGWo"',
	},
});

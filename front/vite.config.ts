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
		JWT: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImdyYW5ub3UiLCJzdWIiOjEsImlhdCI6MTY5Njg2NDA4NCwiZXhwIjoxNjk2OTUwNDg0fQ.uYbID8DdY8ahp7oimNktM1RjeZhVQ9PrgZZrwy7JO38"',
	},
});

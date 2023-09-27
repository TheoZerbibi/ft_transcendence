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
		JWT: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTU4MTY4ODcsImV4cCI6MTY5NTgyNzY4N30.b6A5XrimaNbV34lAdN2lJMKNeXP7w3BmlAf00sI8cQk"',
	},
});

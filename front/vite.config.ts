import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

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
		JWT: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTc4MTk2NTIsImV4cCI6MTY5NzkwNjA1Mn0.4oSbb5pFteyUotBaHOOr0VM8xaQs4XIhI36L74WZzVE"',
	},
});

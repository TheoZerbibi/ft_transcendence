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
<<<<<<< HEAD
	}
=======
	},
	define: {
		JWT: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTgyODYxODcsImV4cCI6MTY5ODM3MjU4N30.cZokNOSjmtMJ0siOsZGbRtST5vZsPpFH6Mut2VdNaoM"',
	},
>>>>>>> d2c0bb9 (feat(pong): Continue backend logic for PongGame)
});

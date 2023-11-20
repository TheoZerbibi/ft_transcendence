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
<<<<<<< HEAD
=======
	define: {
		JWT: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImdyYW5ub3UiLCJzdWIiOjEsImlhdCI6MTY5ODQyMDI0NCwiZXhwIjoxNjk4NTA2NjQ0fQ.Nmi8JfqxquDiJ9hJ14IMVxmMUnVRBsjLAmT7WAdBmjo"',
	},
>>>>>>> dd1f47c (routes created)
});

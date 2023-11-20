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
<<<<<<< HEAD
<<<<<<< HEAD
=======
	define: {
		JWT: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImdyYW5ub3UiLCJzdWIiOjEsImlhdCI6MTY5ODQyMDI0NCwiZXhwIjoxNjk4NTA2NjQ0fQ.Nmi8JfqxquDiJ9hJ14IMVxmMUnVRBsjLAmT7WAdBmjo"',
	},
>>>>>>> dd1f47c (routes created)
=======
>>>>>>> 8f38e0e (chore: Fix linter error)
=======
	define: {
		JWT: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTcyMjEwNTEsImV4cCI6MTY5NzMwNzQ1MX0.trubkPtb_Pcv8y5VEX4u2nk8UxbzOdpXA_z95SGcnNk"',
	},
>>>>>>> c80165e (fix: github issue)
});

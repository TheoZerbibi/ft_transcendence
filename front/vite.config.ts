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
		JWT: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRoemVyaWJpIiwic3ViIjoxLCJpYXQiOjE2OTY0NDYxMDIsImV4cCI6MTY5NjQ1NjkwMn0.Tib3qyH0Q9w8Wa6uwXB2i0_Lfe-D3Ik_qiqDx_fSwVo"',
	},
});

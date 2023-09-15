import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv'

dotenv.config()

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
		HOST: `"${process.env.HOST}"`
	},
});

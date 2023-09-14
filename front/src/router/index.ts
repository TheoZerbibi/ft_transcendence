import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/Homepage.vue'),
		},
		{
			path: '/secret',
			name: 'secret',
			component: () => import('../views/Secret.vue'),
		},
	],
});

export default router;

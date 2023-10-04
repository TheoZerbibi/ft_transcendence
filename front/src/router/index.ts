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
		{
			path: '/team',
			name: 'team',
			component: () => import('../views/Team.vue'),
		},
	],
});

export default router;

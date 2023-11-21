import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/Home.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/Login.vue'),
		},
		{
			path: '/game',
			name: 'GameCreator',
			component: () => import('../views/GameMenu.vue'),
		},
		{
			path: '/game/:uid',
			name: 'Game',
			component: () => import('../views/Pong.vue'),
		},
		{
			path: '/chat',
			name: 'chat',
			component: () => import('../views/Chat.vue'),
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('../views/Profile.vue'),
		},
	],
});

export default router;

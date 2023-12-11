import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('../views/Home.vue'),
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('../views/Login.vue'),
		},
		{
			path: '/game',
			name: 'GameMenu',
			component: () => import('../views/GameMenu.vue'),
		},
		{
			path: '/game/:uid',
			name: 'Game',
			component: () => import('../views/Pong.vue'),
		},
		{
			path: '/chat',
			name: 'Chat',
			component: () => import('../views/Chat.vue'),
		},
		{
			path: '/chat-test',
			name: 'Chat-test',
			component: () => import('../views/Chat-test.vue'),
		},
		{
			path: '/profile',
			name: 'Profile',
			component: () => import('../views/Profile.vue'),
		},
		{
			path: '/test',
			name: 'Test',
			component: () => import('../views/TestView.vue'),
		},
		{
			path: '/FakeAuth',
			name: 'FakeAuth',
			component: () => import('../views/FakeAuth.vue'),
		},
		// Doit a tout pris être en dernier
		{
			path: '/:notFound',
			name: '404',
			component: () => import('../views/PageNotFound.vue'),
		},
	],
});

export default router;

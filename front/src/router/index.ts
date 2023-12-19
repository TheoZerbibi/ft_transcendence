import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
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
			path: '/channels',
			name: 'Channels',
			component: () => import('../views/Channels.vue'),
		},
		{
			path: '/profile',
			name: 'Profile',
			redirect: '/chat?tab=3'
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
		{
			path: '/credit',
			name: 'Credit',
			component: () => import('../views/Credit.vue'),
		},
		{
			path: '/exemple',
			name: 'Exemple',
			component: () => import('../components/exemples/WebsocketExemple.vue'),
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

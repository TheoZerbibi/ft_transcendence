import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('../views/Homepage.vue'),
		},
		{
			path: '/secret',
			name: 'secret',
			component: () => import('../views/SecretView.vue'),
		},
		{
			path: '/test',
			name: 'Test',
			component: () => import('../views/TestView.vue'),
		},
		{
			path: '/game',
			name: 'GameCreator',
			component: () => import('../views/GameCreateView.vue'),
		},
		{
			path: '/game/:uid',
			name: 'Game',
			component: () => import('../views/GameView.vue'),
		},
		{
			path: '/exemples/snackbar',
			name: 'SnackbarExemple',
			component: () => import('../components/exemples/SnackbarExemple.vue'),
		},
		{
			path: '/exemples/websocket',
			name: 'WebsocketExemple',
			component: () => import('../components/exemples/WebsocketExemple.vue'),
		},
		{
			path: '/exemples/p5',
			name: 'P5Exemple',
			component: () => import('../components/exemples/P5Exemple.vue'),
		},
		{
			path: '/secret',
			name: 'secret',
			component: () => import('../views/SecretView.vue'),
		},
		{
			path: '/team',
			name: 'team',
			component: () => import('../views/TeamView.vue'),
		},
		{
			path: '/team/:login',
			name: 'TeamProfile',
			component: () => import('../views/TeamProfileView.vue'),
		},
	],
});

export default router;

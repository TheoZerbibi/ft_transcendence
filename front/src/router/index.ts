import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('../views/HomeView.vue'),
		},
		{
			path: '/about',
			name: 'About',
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
			path: '/team/grannou',
			name: 'grannou',
			component: () => import('../views/GrannouView.vue'),
		},
		{
			path: '/team/thzeribi',
			name: 'thzeribi',
			component: () => import('../views/ThzeribiView.vue'),
		},
		{
			path: '/team/iguidado',
			name: 'iguidado',
			component: () => import('../views/IguidadoView.vue'),
		},
		{
			path: '/team/seozcan',
			name: 'seozcan',
			component: () => import('../views/SeozcanView.vue'),
		},
		{
			path: '/team/nfauconn',
			name: 'nfauconn',
			component: () => import('../views/NfauconnView.vue'),
		},
	],
});

export default router;

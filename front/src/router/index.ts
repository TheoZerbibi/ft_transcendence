import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
		},
		{
			path: '/test',
			name: 'Test',
			component: () => import('../views/TestView.vue'),
		},
		{
			path: '/signin',
			name: 'SignIn',
			component: () => import('../views/auth/SignInView.vue'),
		},
		{
			path: '/game',
			name: 'GameCreator',
			component: () => import('../views/game/GameMenuView.vue'),
		},
		{
			path: '/game/:uid',
			name: 'Game',
			component: () => import('../views/game/GameView.vue'),
		},
		{
			path: '/exemples/snackbar',
			name: 'SnackbarExemple',
			component: () => import('../components/exemples/SnackbarExemple.vue'),
		},
		{
			path: '/exemples/p5',
			name: 'P5Exemple',
			component: () => import('../components/exemples/P5Exemple.vue'),
		},
		{
			path: '/exemples/modal',
			name: 'ModalExemple',
			component: () => import('../components/utils/GameModal.vue'),
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
			path: '/chat/',
			name: 'chat',
			component: () => import('../views/ChatView.vue'),
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('../views/profile/ProfileView.vue'),
		},
		{
			path: '/team',
			name: 'team',
			component: () => import('../views/profile/TeamView.vue'),
		},
		{
			path: '/team/:login',
			name: 'TeamProfile',
			component: () => import('../views/profile/TeamProfileView.vue'),
		},
		{
			path: '/auth',
			name: 'Auth',
			component: () => import('../views/auth/AuthView.vue'),
		},
		{
			path: '/auth/callback:token?',
			name: 'AuthCallback',
			component: () => import('../views/auth/AuthCallbackView.vue'),
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: () => import('../views/PortfolioView.vue'),
		},
		{
			path: '/colors',
			name: 'Colors',
			component: () => import('../components/secrets/Colors.vue'),
		},
		{
			path: '/secret',
			name: 'secret',
			component: () => import('../components/secrets/Secret.vue'),
		},
	],
});

export default router;

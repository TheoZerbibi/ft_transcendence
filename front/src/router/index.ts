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
			path: '/game',
			name: 'GameCreator',
			component: () => import('../views/GameMenuView.vue'),
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
<<<<<<< HEAD
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
<<<<<<< HEAD
<<<<<<< HEAD
			path: '/exemples/modal',
			name: 'ModalExemple',
			component: () => import('../components/exemples/ModalExemple.vue'),
		},
		{

=======
>>>>>>> dd1f47c (routes created)
=======
>>>>>>> 7f206e2 (profile route created)
			path: '/chat',
			name: 'chat',
			component: () => import('../views/ChatView.vue'),
		},
		{
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7f206e2 (profile route created)
			path: '/profile',
			name: 'profile',
			component: () => import('../views/ProfileView.vue'),
		},
		{
<<<<<<< HEAD
=======
>>>>>>> 790bb55 (nav bar to fix)
=======
>>>>>>> dd1f47c (routes created)
=======
>>>>>>> 7f206e2 (profile route created)
			path: '/team',
			name: 'team',
			component: () => import('../views/TeamView.vue'),
		},
		{
			path: '/team/:login',
			name: 'TeamProfile',
			component: () => import('../views/TeamProfileView.vue'),
		},
		{
<<<<<<< HEAD
			path: '/chat/',
			name: 'chat',
			component: () => import('../views/ChatView.vue'),
		},
		{
<<<<<<< HEAD
=======
>>>>>>> eaeb1b1 (move portfolio homepage to /portfolio)
=======
			path: '/auth/signup',
			name: 'Sinup',
			component: () => import('../views/SignupView.vue'),
		},
		{
>>>>>>> 97035c7 (chore: Fix for rebase)
			path: '/secret',
			name: 'secret',
			component: () => import('../views/SecretView.vue'),
		},
		{
			path: '/portfolio',
			name: 'portfolio',
			component: () => import('../views/PortfolioView.vue'),
		},
<<<<<<< HEAD
<<<<<<< HEAD
		{
			path: '/colors',
			name: 'Colors',
			component: () => import('../views/Colors.vue'),
		},
=======
>>>>>>> 7f206e2 (profile route created)
		{
			path: '/colors',
			name: 'Colors',
			component: () => import('../views/Colors.vue'),
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eaeb1b1 (move portfolio homepage to /portfolio)
=======
>>>>>>> 7f206e2 (profile route created)
=======
		{
			path: '/api/oauth/callback',
			name: 'OauthCallback',
			component: () => import('../views/OauthCallbackView.vue'),
		},
>>>>>>> 326d237 (chore: Fix for rebase)
	],
});

export default router;

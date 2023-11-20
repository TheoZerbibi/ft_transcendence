import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
<<<<<<< HEAD
			name: 'home',
			component: () => import('../views/HomeView.vue'),
=======
			name: 'Home',
			component: () => import('../views/Homepage.vue'),
		},
		{
			path: '/secret',
			name: 'secret',
			component: () => import('../views/SecretView.vue'),
>>>>>>> c80165e (fix: github issue)
		},
		{
			path: '/test',
			name: 'Test',
			component: () => import('../views/TestView.vue'),
		},
		{
			path: '/game',
			name: 'GameCreator',
<<<<<<< HEAD
<<<<<<< HEAD
			component: () => import('../views/GameMenuView.vue'),
=======
			component: () => import('../views/GameCreateView.vue'),
>>>>>>> c80165e (fix: github issue)
=======
			component: () => import('../views/game/GameMenuView.vue'),
>>>>>>> 7c05d9e (chore: Change File infra for front)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c80165e (fix: github issue)
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
<<<<<<< HEAD
			path: '/exemples/modal',
			name: 'ModalExemple',
			component: () => import('../components/utils/GameModal.vue'),
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
			component: () => import('../views/profile/ProfileView.vue'),
		},
		{
<<<<<<< HEAD
=======
>>>>>>> 790bb55 (nav bar to fix)
=======
>>>>>>> dd1f47c (routes created)
=======
>>>>>>> 7f206e2 (profile route created)
=======
			path: '/secret',
			name: 'secret',
			component: () => import('../views/SecretView.vue'),
		},
		{
>>>>>>> c80165e (fix: github issue)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
			path: '/chat/',
			name: 'chat',
			component: () => import('../views/ChatView.vue'),
=======
			path: '/auth',
			name: 'Auth',
			component: () => import('../views/auth/AuthView.vue'),
>>>>>>> 7c05d9e (chore: Change File infra for front)
		},
		{
<<<<<<< HEAD
=======
>>>>>>> eaeb1b1 (move portfolio homepage to /portfolio)
=======
=======
>>>>>>> af628b1 (feat: added support for auth/signup page)
=======
>>>>>>> c80165e (fix: github issue)
			path: '/auth/signup',
			name: 'Sinup',
			component: () => import('../views/auth/SignupView.vue'),
		},
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		{
>>>>>>> 97035c7 (chore: Fix for rebase)
			path: '/secret',
			name: 'secret',
			component: () => import('../components/secrets/Secret.vue'),
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
			component: () => import('../components/secrets/Colors.vue'),
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
			path: '/auth/callback:token?',
			name: 'AuthCallback',
			component: () => import('../views/auth/OauthCallbackView.vue'),
		},
>>>>>>> 326d237 (chore: Fix for rebase)
=======
>>>>>>> af628b1 (feat: added support for auth/signup page)
=======
=======
>>>>>>> c80165e (fix: github issue)
		{
			path: '/api/oauth/callback:token',
			name: 'OauthCallback',
			component: () => import('../views/OauthCallbackView.vue'),
		},
<<<<<<< HEAD
>>>>>>> 7711274 (fix: rework)
=======
>>>>>>> c80165e (fix: github issue)
	],
});

export default router;

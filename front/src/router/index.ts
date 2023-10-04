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
		}

	],
});

export default router;

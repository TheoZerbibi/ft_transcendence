import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
	state: () => ({
		isLoggedIn: false,
	}),
	actions: {
		login() {
			this.isLoggedIn = true;
		},
		logout() {
			this.isLoggedIn = false;
		},
	},
});

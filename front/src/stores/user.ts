import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
	state: () => ({
		JWT: null as string | null,
	}),
	getters: {
		getJWT: (state) => {
			return state.JWT;
		},
	},
	actions: {
		setJWT(jwt: string) {
			this.JWT = jwt;
		},
	},
	persist: true,
});

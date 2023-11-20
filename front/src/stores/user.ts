import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
	state: () => ({
		JWT: null as string | null,
		login: null as string | null,
		displayName: null as string | null,
		avatar: undefined as string | undefined,
	}),
	getters: {
		getJWT: (state) => {
			return state.JWT;
		},
		getUser: (state) => {
		},
	},
	actions: {
		async setJWT(jwt: string) {
			this.JWT = jwt;
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.JWT}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			const response: any = await new Promise((resolve) => {
				const res = fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/me`,
					requestOptions,
				);
				resolve(res);
			});
			const data = await response.json();
			if (!response.ok) {
				this.JWT = null;
				this.login = null;
				this.displayName = null;
				this.avatar = undefined;
				throw new Error(data.message);
			}

			this.login = data.login;
			this.displayName = data.display_name;
			this.avatar = data.avatar;
		},
	},
});

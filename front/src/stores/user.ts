import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
	state: () => ({
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
			return { login: state.login, displayName: state.displayName, avatar: state.avatar };
>>>>>>> ef81387 (feat(pong): Start Responsive)
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
			console.log(data);
>>>>>>> ef81387 (feat(pong): Start Responsive)
=======

>>>>>>> 98da990 (feat(pong): Improve Pong, fix a lot a Backend error + more frontend.)
			this.login = data.login;
			this.displayName = data.display_name;
			this.avatar = data.avatar;
=======
		isLoggedIn: false,
	}),
	actions: {
		login() {
			this.isLoggedIn = true;
		},
		logout() {
			this.isLoggedIn = false;
>>>>>>> c80165e (fix: github issue)
		},
	},
});

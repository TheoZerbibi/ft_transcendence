import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
	state: () => ({
		JWT: null as string | null,
		login: null as string | null,
		displayName: null as string | null,
		email: null as string | null,
		avatar: undefined as string | undefined,
		created_at: null as Date | null,
	}),
	getters: {
		getJWT: (state) => {
			return state.JWT;
		},
		getUser: (state) => {
			return { login: state.login, displayName: state.displayName, avatar: state.avatar };
		},
	},
	actions: {
		async setJWT(jwt: string): Promise<void> {
			this.JWT = jwt;
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.JWT}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/profile/me`,
					requestOptions,
				);

				if (!response.ok) {
					const errorData = await response.json();
					this.JWT = null;
					this.login = null;
					this.displayName = null;
					this.avatar = undefined;
					return Promise.reject(errorData);
				}

				const data = await response.json();
				this.login = data.login;
				this.displayName = data.display_name;
				this.email = data.email;
				this.created_at = new Date(data.created_at);
				this.avatar = data.avatar;
				return Promise.resolve(data);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		setAvatar(avatar: string): void {
			this.avatar = avatar;
		}
	},
	persist: true,
});

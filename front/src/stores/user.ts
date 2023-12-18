import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
	state: () => ({
		JWT: null as string | null,
		login: null as string | null,
		displayName: null as string | null,
		dAuth: false as boolean,
		email: null as string | null,
		avatar: undefined as string | undefined,
		isOnline: false as boolean,
		created_at: null as Date | null,
	}),
	getters: {
		getJWT: (state) => {
		//	return state.JWT;
				
		return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInN1YiI6ZmFsc2UsImlhdCI6MTcwMjg5ODA1NiwiZXhwIjoxNzAyOTg0NDU2fQ.JZFdj_hTYA5yJmPTc_Jqbs-hD8fV2nrA0sMeqWOCR4Y';
		},
		getUser: (state) => {
			return { login: state.login, displayName: state.displayName, avatar: state.avatar };
		},
		is2FA: (state) => {
			return state.dAuth;
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
					this.dAuth = false;
					this.isOnline = false;
					return Promise.reject(errorData);
				}

				const data = await response.json();
				this.login = data.login;
				this.displayName = data.display_name;
				this.email = data.email;
				this.created_at = new Date(data.created_at);
				this.avatar = data.avatar;
				this.dAuth = data.dAuth;
				this.isOnline = true;
				return Promise.resolve(data);
			} catch (error) {
				return Promise.reject(error);
			}
		},
		setAvatar(avatar: string): void {
			this.avatar = avatar;
		},
		set2FA(dAuth: boolean): void {
			this.dAuth = dAuth;
		},
		deleteUser(): void {
			this.JWT = null;
			this.login = null;
			this.displayName = null;
			this.avatar = undefined;
			this.dAuth = false;
			this.isOnline = false;
		},
	},
	persist: {
		enabled: true,
	},
});

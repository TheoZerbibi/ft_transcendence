import { defineStore } from 'pinia';

export const useBlockedUser = defineStore('blockedUser', {
	state: () => ({
		blockedUser: [] as any[],
	}),
	getters: {
		getBlockedList: (state) => {
			return state.JWT;
		},
	},
	actions: {
		async fetchBlockedUsers(jwt: string): Promise<void> {
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/blocked`,
					requestOptions,
				);

				if (!response.ok) {
					const errorData = await response.json();
			
					return Promise.reject(errorData);
				}

				const data = await response.json();
				console.log(data);
				return Promise.resolve(data);
			} catch (error) {
				return Promise.reject(error);
			}
		},
	},
});

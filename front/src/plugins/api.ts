// api.ts

import { useUser } from '../stores/user';
import { computed } from 'vue';

interface ApiResponse<T> {
	data: T;
	error?: string;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const userStore = useUser();

export class api {
	method = 'GET';
	baseURL = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}`;
//	JWT = computed(() => userStore.getJWT);
	JWT!: string = computed(() => userStore.getJWT());
	userStore = useUser();
	headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${userStore.getJWT}`,
		'Access-Control-Allow-Origin': '*',};

	response: any;
	
	constructor (method?: string) {
		this.method = method;
	};

	status(response){
			if (response.status >= 200 && response.status < 300) {
				return Promise.resolve(response);
			}
			else {
				return Promise.reject(new Error( response.statusTex ));
			}
	}

	async fetch(request: string, body: any, method?: string):string  {
		if (method !== undefined)
			this.method = method;

		const requestBody: any = {method: this.method, header : this.headers, body: JSON.stringify(body.name)};
		console.log(`fetching for request: ${request} with request: ${JSON.stringify(requestBody)}`);
		await fetch(this.baseURL + request, { method: this.method, header : this.header, body: JSON.stringify(body)}).then(status).then((stringified) => { this.response = stringified.json() });
	}

	async getChannels() {
		this.method = 'GET';

		await fetch()
		.then(this.status)
		.then((stringified) => stringified.json())
		.then((channels) => channels)


	}

	async postData(request:string, body: any)
	{
		this.method = 'POST';
		return await this.fetch(request, body);
//		.then(this.status)
//		.then((stringified) => {return stringified });

	}

	async createChannel(channelData) {
		const body = {
			name: channelData.name,
			password: channelData.password,
			isPublic: channelData.isPublic,
		};
		return this.postData('/channel/create', body);
	}


	async postChannels(channelData: ChannelData) {
		this.fetch('/channel/create', 'POST', channelData);

		//		await fetch( `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${channel_name}/join`,
		//				{
		//				method: 'POST',
		//				headers: {
		//					Authorization: `Bearer ${this.JWT}`,
		//					'Access-Control-Allow-Origin': '*',
		//				},
		//				body: JSON.stringify({
		//					name: ChannelCreationData.name,
		//					password: ChannelCreationData.password,
		//					isPublic: ChannelCreationData.isPublic,
		//				}),
		//			}
	}
}

//	refreshToken () {
//		// implement function to refresh token
//	};
//	
//	
//	getChannels(request: string):  {
//		method = 'GET';
//		try {
//				const response = await fetch(this.url + request);
//		}
//		catch (e) {
//			
//		}
//	};
//	
//	
//	
//	
//	extern function postApi
//	try {
//	}
//	// Refresh the token before each request
//				return config;
//			} catch (error) {
//				return Promise.reject(error);
//			}
//		}
//	);

//	// Refresh the token on 401 response
//	api.interceptors.response.use(
//		(response) => response,
//			async (error) => {
//			const originalRequest = error.config;
//	
//			// If the error status is 401 and the request hasn't been retried yet
//			if (error.response.status === 401 && !originalRequest._retry) {
//				originalRequest._retry = true;
//	
//				// Refresh the token
//				try {
//					await userStore.refreshToken(); // Adjust this according to your store methods
//					const JWT = userStore.getJWTToken();
//					originalRequest.headers.Authorization = `Bearer ${JWT}`;
//					return axios(originalRequest);
//				} catch (refreshError) {
//					return Promise.reject(refreshError);
//				}
//			}
//	
//			return Promise.reject(error);
//		}
//	);
//		USAGE EXEMPLE
//
//  async function fetchUserData(userId: string): Promise<void> {
//  const url = `/api/users/${userId}`;
//  const { data, error } = await fetchData<User>(url);
//
//  if (error) {
//    console.error(`Error fetching user data: ${error}`);
//    return;
//  }


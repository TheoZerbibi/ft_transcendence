// api.ts

import axios, { AxiosRequestConfig } from 'axios';
import { useUser } from '../stores/user';

interface ApiResponse<T> {
	data: T;
	error?: string;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const userStore = useUser();

const baseUrl = 'https://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/';


// Create an axios instance for your API
const api = {
	method: 'GET',
	baseURL: 'https://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${userStore.getJWTToken()}`,
		'Access-Control-Allow-Origin': '*',
	},
};


extern function 
try {
	
}
// Refresh the token before each request
api.interceptors.request.use(
	async (config: AxiosRequestConfig) => {
		try {
			// Refresh the token if needed
			const JWT = userStore.getJWT();
			config.headers.Authorization = `Bearer ${JWT}`;
			return config;
		} catch (error) {
			return Promise.reject(error);
		}
	}
);

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

// Export the axios instance
export default api;

// Function to fetch data
export async function fetchData<T>(
	url: string,
	method: HttpMethod = 'GET',
		body?: Record<string, any>
): Promise<ApiResponse<T>> {
	try {
		const response = await api.request({
			url,
			method,
			data: body,
		});

		return { data: response.data };
	} catch (error) {
		return { data: null, error: error.message || 'An error occurred' };
	}
}

export async function postData<T>(
	url: string,
	method: HttpMethod = 'POST',
		body?: Record<string, any>
): Promise<ApiResponse<T>> {
	try {
		const response = await api.request({
			url,
			method,
			data: body,
		});

		return { data: response.data };
	} catch (error) {
		return { data: null, error: error.message || 'An error occurred' };
	}
}

export async function createChannel(channelData) {
	const body = {
		name: channelData.name,
		password: channelData.password,
		isPublic: channelData.isPublic,
	};
	return postData(url, method, body);
}

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


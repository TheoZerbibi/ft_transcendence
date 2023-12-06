<template>

</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	props: {
		friendLogin: String,
	},
	data() {
		return {
			messages: [],
		};
	},
	beforeMount() {
		this.fetchMessages();
	},
	mounted() {},
	methods: {
		fetchMessages: async function() {
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/${this.friendLogin}/all`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				const data = await response.json();
				this.messages = data;
			} catch (error) {
				console.error(error);
			}
		},

	},
};

</script>

<style scoped>

</style>
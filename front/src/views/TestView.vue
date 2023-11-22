<template>
	<v-file-input v-model="selectedImage" label="Choose a file"></v-file-input>
	<v-btn @click="uploadImage">Upload</v-btn>
	<Snackbar />
</template>

<script lang="ts">
import { computed } from 'vue';
import Snackbar from '../components/layout/Snackbar.vue';
import { useSnackbarStore } from '../stores/snackbar';
import { useUser } from '../stores/user';

const snackbarStore = useSnackbarStore();

export default {
	name: 'TestView',
	components: { Snackbar },
	setup() {
		const userStore = useUser();
		const JWT = computed(() => userStore.getJWT);

		return {
			JWT,
		};
	},
	data() {
		return {
			selectedImage: undefined as File[] | undefined,
		};
	},
	methods: {
		async uploadImage() {
			const formData = new FormData();
			console.log(this.selectedImage);
			formData.append('file', this.selectedImage);
			for (const value of formData.values()) {
				if (value instanceof File) {
					const v: File = value;
					console.log(v);
				}
			}

			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/getCloudinaryLink`,
					{
						method: 'POST',
						body: formData,
						headers: {
							Authorization: `Bearer ${this.JWT}`,
						},
					},
				);

				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					console.log(response);
					return;
				}

				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

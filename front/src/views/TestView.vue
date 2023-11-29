<template>
	<v-file-input v-model="selectedImage" label="Choose a file"></v-file-input>
	<v-btn @click="uploadImage">Upload</v-btn>
	<v-avatar>
		<img :style="{
			width: '100%',
			height: '100%',
		}" :src="user.avatar" />
	</v-avatar>
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
		const user = computed(() => userStore.getUser);
		const setAvatar = computed(() => userStore.setAvatar);

		return {
			JWT,
			user,
			setAvatar,
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

			if (this.selectedImage[0] instanceof File) {
				formData.append('file', this.selectedImage[0]);
			} else {
				return console.error('this.selectedImage is not a File object.');
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
					const error = await response.json()
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					console.log(response);
					return;
				}

				const data = await response.json();
				this.setAvatar(data.avatar);
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

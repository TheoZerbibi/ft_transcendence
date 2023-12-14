<template>

</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import Snackbar from '../components/layout/Snackbar.vue';

const snackbarStore = useSnackbarStore();

export default {
	name: 'TestView',
	components: { Snackbar },
	setup() {
		const userStore = useUser();
		const JWT = computed(() => userStore.getJWT);
		const setJWT = (JWT: string) => userStore.setJWT(JWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			setJWT,
			user,
			is2FA,
		};
	},
	data() {
		return {
		};
	},
	methods: {
	},
};
</script>

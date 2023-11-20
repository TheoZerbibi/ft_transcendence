<template>
	<div>
		<h1>Tempo Auth</h1>
		<v-text-field v-model="jwtInput" label="JWT Token" @keydown.enter="setJWT(jwtInput)" />
		{{ JWT }}
	</div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

import { useUser } from '../stores/user';

export default {
	name: 'AuthView',
	setup() {
		const userStore = useUser();
		const jwtInput = ref('');

		const JWT = computed(() => userStore.getJWT);

		const setJWT = (jwt: string) => {
			userStore.setJWT(jwt);
		};

		return {
			jwtInput,
			JWT,
			setJWT,
		};
	},
	data() {
		return {};
	},
};
</script>

<template>
	<div>
		<h1>Tempo Auth</h1>
		<v-text-field v-model="jwtInput" label="JWT Token" @keydown.enter="setJWT(jwtInput)" />
		{{ JWT }}
		<br />
		<v-avatar>
			<v-img :src="user.avatar" />
		</v-avatar>
		{{ user.login }} : {{ user.displayName }}
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

		const JWT: any = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		const setJWT = (jwt: string) => {
			userStore.setJWT(jwt);
		};

		return {
			jwtInput,
			JWT,
			user,
			setJWT,
		};
	},
};
</script>

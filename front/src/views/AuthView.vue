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

<<<<<<< HEAD
<<<<<<< HEAD
		const JWT: any = computed(() => userStore.getJWT);
=======
		const JWT = computed(() => userStore.getJWT);
>>>>>>> ef81387 (feat(pong): Start Responsive)
=======
		const JWT: any = computed(() => userStore.getJWT);
>>>>>>> c7368ae (feat(pong): Front for the Pong)
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
<<<<<<< HEAD
=======
	mounted() {
		console.log(this.JWT);
		console.log(this.user);
	},
>>>>>>> ef81387 (feat(pong): Start Responsive)
};
</script>

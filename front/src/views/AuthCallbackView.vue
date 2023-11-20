<script lang="ts">
<<<<<<< HEAD
import { useRoute } from 'vue-router';

export default {
	name: 'AuthCallbackView',
	setup() {
		const route = useRoute();
		const code = route.query.code as string;
		const state = route.query.state as string;

		console.log('code', code);
		console.log('state', state);

		return {
			code,
			state,
		};
	},
	beforeMount() {
		console.log('beforeMount');
		fetch('http://localhost:3001/auth/callback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ code: this.code, state: this.state }),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('res', res);
				if (res.success) {
					localStorage.setItem('token', res.token);
					localStorage.setItem('user', JSON.stringify(res.user));
					this.$router.push({ name: 'HomeView' });
				} else {
					this.$router.push({ name: 'LoginView' });
				}
			})
			.catch((err) => {
				console.log('err', err);
				this.$router.push({ name: 'LoginView' });
			});
	}
};
=======

>>>>>>> f54b82a (feat: callback route en cours)
</script>

<template>
	<div>
		<h2>Redirection Page</h2>
		<p>Loading...</p>
		
	</div>	
</template>

<style scoped>
</style>
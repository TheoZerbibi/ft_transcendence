<template>
	<v-row align="center" justify="center" class="fill-height" id="background">
		<h1 class="darkNeonPolice">Bienvenue {{ user.displayName }} !</h1>
	</v-row>
	<Footer />
</template>

<script lang="ts">
import Footer from '../components/layout/Footer.vue';
import { useUser } from '../stores/user';
import { computed } from 'vue';

const userStore = useUser();

export default {
	name: 'HomeView',
	components: { Footer },
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	async beforeMount() {
		const token = this.$cookies.get('token');
		if (!this.JWT || token) {
			if (token) {
				this.$cookies.remove('token');
				try {
					await userStore.setJWT(token);
				} catch (err) {
					return this.$router.push({ name: `Login` });
				}
			} else return this.$router.push({ name: `Login` });
		}
	},
};
</script>

<style>
#background {
	background-image: url('/src/assets/OmoriWallpapers/OmoriHeadSpace.png');
	background-repeat: no-repeat;
	background-position: center;
}
</style>

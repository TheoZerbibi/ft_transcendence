<template>
	<v-row align="center" justify="center" class="fill-height" id="background">
	</v-row>
	<Footer />
</template>

<script lang="ts">
import Footer from '../components/utils/Footer.vue';
import { makeid } from '../plugins/makeId';

export default {
	name: 'HomeView',
	components: { Footer },
	methods: {
		redirectToOAuth() {
			const clientId = import.meta.env.VITE_API42_UID;
			const redirectUri = import.meta.env.VITE_API42_CALLBACK;
			const responseType = 'code';
			const scope = 'public';
			const state = makeid(42);

			const params = new URLSearchParams();
			params.append('client_id', clientId);
			params.append('redirect_uri', redirectUri);
			params.append('response_type', responseType);
			params.append('scope', scope);
			params.append('state', state);

			const query = params.toString();

			window.location.href = `https://api.intra.42.fr/oauth/authorize?${query}`;
		},
	},
};
</script>

<style>
#background {
	background-image: url('/src/assets/OmoriWallpapers/OmoriHeadSpace.png');
}
</style>

<template>
	<v-row align="center" justify="center" class="fill-height" id="background">
		<v-card class="homepage text-center blurred-card rounded-card" variant="tonal" width="600">
			<v-card-item>
				<v-card-title class="title">
					<p class="neonPolice">Welcome to NSTG's ft_transcendence</p>
				</v-card-title>
				<v-img
					class="rounded-card"
					src="/src/assets/OmoriPictures/Omori007.jpg"
					contain
					max-height="300"
					alt="These are us"
				/>
				<v-card-subtitle class="neonPolice homeSubtitles">
					<br />Gaelle, <span class="teamLeader">Theo</span>, Semiha, Noe
				</v-card-subtitle>
			</v-card-item>
			<v-card-text class="neonPolice text homeSubtitles"> <br />students of 42 paris<br /> </v-card-text>
			<v-card-actions>
				<v-btn
					id="authButton"
					class="text-capitalize"
					rounded="xl"
					color="#C306DF"
					variant="outlined"
					size="x-large"
					@click="redirectToOAuth"
				>
					<span class="neonPolice"> 💡 Sign in with 42 </span>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
	<Footer />
</template>

<script lang="ts">
import Footer from '../components/layout/Footer.vue';
/* import { makeid } from '../plugins/makeId'; */

export default {
	name: 'SignIn',
	components: { Footer },
	methods: {
		redirectToOAuth() {
			const HOST = import.meta.env.VITE_HOST;
			const PORT = import.meta.env.VITE_API_PORT;

			window.location.href = `http://${HOST}:${PORT}/auth/42/callback`;
		},
	},
};
</script>

<style>
#background {
	background-image: url('/src/assets/OmoriHomepageWallpaper.jpg');
}

.homepage {
	display: flex;
	align-items: center;
	flex-direction: column;
	/* background: linear-gradient(90deg, #8360c3, #2ebf91); */
}

.title {
	display: flex;
	align-items: flex-start;
	margin: 20px;
	padding: 20px;
}

.teamLeader {
	font-weight: bold;
	color: darkmagenta;
}

#authButton:hover {
	background-color: black;
	box-shadow: 6px 6px 0px rgba(0, 0, 0);
	/* box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.5); */
	border: double;
}

#authButton:hover span {
	color: white !important;
}
</style>
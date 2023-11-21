<template>
	<v-row align="center" justify="center" class="fill-height background d-flex" id="bg">
		<img src="/ui/Door.png" class="polaroid" alt="These are us" @click="redirectToOAuth" id="polaroid" />
		<!-- <div class="homepage text-center d-flex">
			 <v-card-item>
					<v-card-title class="title">
						<p class="neonPolice">Welcome to NSTG's ft_transcendence</p>
					</v-card-title>
					<v-card-subtitle class="neonPolice homeSubtitles">
						<br />Gaelle, <span class="teamLeader">Theo</span>, Semiha, Noe
					</v-card-subtitle>
				</v-card-item>
			<v-card-text class="neonPolice text homeSubtitles"> <br />students of 42 paris<br /> </v-card-text>
			<v-card-actions>
				<v-btn id="authButton" class="text-capitalize" size="x-large" @click="redirectToOAuth">
					<span class="neonPolice"> 💡 Sign in with 42 </span>
				</v-btn>
			</v-card-actions>
		</div> -->
	</v-row>
	<!-- <Footer /> -->
</template>

<script lang="ts">
import Footer from '../components/layout/Footer.vue';

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
.background {
	background-color: white;
	pointer-events: none;
}

.homepage {
	display: flex;
	align-items: center;
	flex-direction: column;
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

.polaroid {
	height: 40vw;
	z-index: 99999999;
	pointer-events: auto;
}

.polaroid:hover {
	-webkit-filter: brightness(10);
	filter: brightness(10);
	filter: invert(1);
	cursor: url(https://www.omori-game.com/img/cursor/cursor.png), auto;
	-webkit-box-shadow: 0 4px 4px -2px #000000;
	-moz-box-shadow: 0 4px 4px -2px #000000;
	box-shadow: 0 40px 40px -2px #000000;
	transition: 0.5s ease-in-out all;
}

.background:hover {
	background-color: black;
	transition: 1s ease-in-out all;
}

.group-image {
	height: 100%;
	width: 100%;
	z-index: -99999999;
}

#authButton:hover {
	background-color: black;
	box-shadow: 6px 6px 0px rgba(0, 0, 0);
	border: double;
}

#authButton:hover span {
	color: white !important;
}
</style>

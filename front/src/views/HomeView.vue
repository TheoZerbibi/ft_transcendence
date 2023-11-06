<template>
	<header>
		<p>This is a header, can be a navbar menu</p>
	</header>
	<nav>
		<p>This is a navbar to display after authentification, vertically left better?</p>
		<!--Cf ul and li balises-->
	</nav>
	<v-row align="center" justify="center" class="fill-height" id="background">
		<v-card class="homepage text-center rounded-card" variant="tonal" color="green darken-4" width="700">
			<v-card-item>
				<v-card-title class="title">
					<p class="neonPolice">Welcome to STING's ft_transcendence</p>
					<br />
					<br />
				</v-card-title>
				<v-img src="CatsRounded.png" contain max-height="300" alt="These are cute kittens" />
				<v-card-subtitle class="neonPolice text homeSubtitles">
					<br />Gaëlle, Ismaël, <span class="teamLeader">Théo</span>, Semiha, Noé
				</v-card-subtitle>
			</v-card-item>
			<v-card-text class="neonPolice text homeSubtitles">
				<br />students of 42 paris<br />
				<!-- <strong>students of 42 paris (en gras)</strong><br /> -->
				<!-- <mark>students of 42 paris (en surligne)</mark><br /> -->
				<!-- <em>students of 42 paris (en italique)</em><br /> -->
			</v-card-text>
			<v-card-actions>
				<v-btn
					id="authButton"
					class="text-capitalize"
					rounded="xl"
					color="green darken-4"
					variant="outlined"
					size="x-large"
					border="doted"
					href="https://intra.42.fr"
					target="_blank"
				>
					<div class="neonPolice">&#129418; <span class="auth">Authenticate with 42</span></div>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
	<aside>
		<p>This is an aside section</p>
	</aside>
	<footer>
		<p>This is a footer</p>
		<a href="https://www.instagram.com" target="_blank">Instagram </a>
		<a href="https://www.facebook.com" target="_blank">Facebook </a>
		<a href="https://www.twitter.com" target="_blank">Twitter </a>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
});
</script>

<style>
.homepage {
	display: flex;
	align-items: center;
	flex-direction: column;
	background: linear-gradient(90deg, #8360c3, #2ebf91);
}

.title {
	display: flex;
	align-items: flex-start;
	margin: 20px;
	padding: 20px;
}

.text {
	font-family: 'OMORI_MAIN';
	font-size: 30px;
}

@font-face {
	font-family: 'OMORI_MAIN';
	src: url('../assets/fonts/OMORI_GAME.ttf') format('truetype-variations');
}

@font-face {
	font-family: 'OMORI_DISTURBED';
	src: url('../assets/fonts/OMORI_GAME2.ttf') format('truetype-variations');
}

.teamLeader {
	font-weight: bold;
	color: darkmagenta;
}

#authButton:hover {
	/* box-shadow: 6px 6px 0px rgba(0, 0, 0);  Button with shadow non gradient*/
	box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.5);
	border: double;
}

.auth:hover {
	color: darkmagenta;
}
</style>

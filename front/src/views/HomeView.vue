<template>
	<v-row align="center" justify="center" class="fill-height" id="background">
		<v-card class="homepage text-center blurred-card rounded-card" variant="tonal" color="green darken-4" width="600">
			<v-card-item>
				<v-card-title class="title">
					<p class="neonPolice">Welcome to NSTG's ft_transcendence</p>
				</v-card-title>
				<v-img class="rounded-card" src="/src/assets/OmoriPictures/Omori007.jpg" contain max-height="300" alt="These are us" />
				<v-card-subtitle class="neonPolice homeSubtitles">
					<br />Gaelle, <span class="teamLeader">Théo</span>, Semiha, Noe
				</v-card-subtitle>
			</v-card-item>
			<v-card-text class="neonPolice text homeSubtitles">
				<br />students of 42 paris<br />
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
	<HomepageFooter></HomepageFooter>
	<v-footer class="neonPolice footer blurred-card" alt="Footer">
		<a href="https://www.instagram.com/42.born2code/" target="_blank">42Instagram</a>
		&#129418
		<a href="https://www.facebook.com/42born2code" target="_blank">42Facebook</a>
		&#129418
		<a href="https://twitter.com/42born2code?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">42Twitter</a>
	</v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
	data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
});
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
	box-shadow: 6px 6px 0px rgba(0, 0, 0);
	/* box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.5); */
	border: double;
}

.footer {
	display:block;
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    padding-top: 14px;
    padding-bottom: 14px;
    padding-left: 24px;
    height: 36px;
    text-align: center;
}

</style>

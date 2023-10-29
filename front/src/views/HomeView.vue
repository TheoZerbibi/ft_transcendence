<template>
		<v-row align="center" justify="center" class="fill-height">
		<v-card class="homepage text-center rounded-card"  variant="tonal" color="green darken-4" width="600">
			<v-card-item>	
				<v-card-title class="title">	
					<p class="neonPolice">Welcome to STING's ft_transcendence</p>
					<br />
					<br />
				</v-card-title>

				<v-img src="CatsRounded.png" contain max-height="300" ></v-img>

				<v-card-subtitle>
					Gaëlle, Ismaël, Théo, Semiha, Noé
				</v-card-subtitle>
			</v-card-item>

			<v-card-text>
				students of 42 paris
			</v-card-text>

			<v-card-actions>
				<v-btn
					prepend-icon="mdi-check-circle"
					class="text-capitalize" 
					rounded="xl"
					color="green darken-4"
					variant="outlined"
					size="x-large"
					href="https://intra.42.fr"
					target="_blank">
					<template v-slot:prepend>
    				    <v-icon color="success"></v-icon>
    	  			</template>
						<div class ="neonPolice">
						Authenticate with 42
						</div>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
});
</script>

<style scoped>
.homepage  {
	display: flex;
	align-items: center;
	flex-direction: column;
}
.rounded-card{
    border-radius:50px;
}

.title {
	display: flex;
	align-items: flex-start;
}

.button {
	display: flex;

	justify-content: flex-end;
}

.neonPolice {
	font-family: 'Dancing Script Variable', sans-serif;
	font-size: xx-large;
	color: black;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}

/* dancing-script-latin-wght-normal */
@font-face {
  font-family: 'Dancing Script Variable';
  font-style: normal;
  font-display: swap;
  font-weight: 400 700;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/dancing-script:vf@latest/latin-wght-normal.woff2) format('woff2-variations');
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}

</style>

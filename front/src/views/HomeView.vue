<template>
	<!--Header avec l'ampoule a tester-->
	<!-- <header role="banner" class="site-header hide-on-overlay" data-v-9fb9646a=""> -->
	<!-- <img class="site-header__logo" width="125" height="76" draggable="false" src="/src/assets/OmoriWallpapers/logo1.png" data-v-9fb9646a=""> -->
	<!-- <div class="site-header__lightbulb" data-v-9fb9646a=""> -->
	<!-- <img draggable="false" src="/src/assets/OmoriWallpapers/lightbulb.gif" data-v-9fb9646a=""> -->
	<!-- </div> -->
	<!-- <img class="site-header__logo" width="98" height="76" draggable="false" src="/src/assets/OmoriWallpapers/logo2.png" data-v-9fb9646a=""> -->
	<!-- </header> -->

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
					href="/auth/signup"
				>
					<span class="neonPolice"> 💡 Sign in with 42 </span>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
	<Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from '../components/utils/Footer.vue';

export default defineComponent({
	name: 'HomeView',
	components: { Footer },
});
</script>
<!-- <script nomodule="">!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",(function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()}),!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();</script> -->
<!-- <script nomodule="" crossorigin="" id="vite-legacy-polyfill" src="/assets/polyfills-legacy.6f6a2d61.js"></script> -->
<!-- <script nomodule="" crossorigin="" id="vite-legacy-entry" data-src="/assets/index-legacy.aeef6c48.js">System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))</script> -->

<style>
*,
:before,
:after {
	--tw-border-spacing-x: 0;
	--tw-border-spacing-y: 0;
	--tw-translate-x: 0;
	--tw-translate-y: 0;
	--tw-rotate: 0;
	--tw-skew-x: 0;
	--tw-skew-y: 0;
	--tw-scale-x: 1;
	--tw-scale-y: 1;
	--tw-pan-x: ;
	--tw-pan-y: ;
	--tw-pinch-zoom: ;
	--tw-scroll-snap-strictness: proximity;
	--tw-ordinal: ;
	--tw-slashed-zero: ;
	--tw-numeric-figure: ;
	--tw-numeric-spacing: ;
	--tw-numeric-fraction: ;
	--tw-ring-inset: ;
	--tw-ring-offset-width: 0px;
	--tw-ring-offset-color: #fff;
	--tw-ring-color: rgba(59, 130, 246, 0.5);
	--tw-ring-offset-shadow: 0 0 #0000;
	--tw-ring-shadow: 0 0 #0000;
	--tw-shadow: 0 0 #0000;
	--tw-shadow-colored: 0 0 #0000;
	--tw-blur: ;
	--tw-brightness: ;
	--tw-contrast: ;
	--tw-grayscale: ;
	--tw-hue-rotate: ;
	--tw-invert: ;
	--tw-saturate: ;
	--tw-sepia: ;
	--tw-drop-shadow: ;
	--tw-backdrop-blur: ;
	--tw-backdrop-brightness: ;
	--tw-backdrop-contrast: ;
	--tw-backdrop-grayscale: ;
	--tw-backdrop-hue-rotate: ;
	--tw-backdrop-invert: ;
	--tw-backdrop-opacity: ;
	--tw-backdrop-saturate: ;
	--tw-backdrop-sepia: ;
	box-sizing: border-box;
	border-width: 0;
	border-style: solid;
	border-color: currentColor;
}

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

.footer {
	display: block;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	padding-top: 14px;
	padding-bottom: 14px;
	padding-left: 24px;
	height: 36px;
	text-align: center;
}

a {
	color: black;
}

.site-header {
	display: flex;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: optimize-contrast;
	image-rendering: crisp-edges;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
	-moz-tap-highlight-color: transparent;
	-webkit-tap-highlight-color: transparent;
	margin-bottom: 0;
	min-height: -moz-fit-content;
	min-height: fit-content;
	padding-top: 1.5rem;

	@media (min-width: 30rem) {
		padding-top: 2rem;
	}
}
</style>

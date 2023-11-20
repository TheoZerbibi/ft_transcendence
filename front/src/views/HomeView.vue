<template>
<<<<<<< HEAD
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
				<v-img class="rounded-card" src="/src/assets/OmoriPictures/Omori007.jpg" contain max-height="300" alt="These are us" />
				<v-card-subtitle class="neonPolice homeSubtitles">
					<br />Gaelle, <span class="teamLeader">Theo</span>, Semiha, Noe
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
					color="#C306DF"
					variant="outlined"
					size="x-large"
					href="https://intra.42.fr"
					target="_blank">
					<span class="neonPolice">
						💡 Sign in with 42
					</span>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
	<HomepageFooter></HomepageFooter>
	<v-footer class="neonPolice footer blurred-card" alt="Footer">
		<span style="color:black"> ☆⋆｡𖦹°‧★ </span>
		<a href="https://www.instagram.com/42.born2code/" target="_blank">Instagram</a>
		<span style="color:black"> 👁 </span>
		<a href="https://www.facebook.com/42born2code" target="_blank">Facebook</a>
		<span style="color:black"> 👁 </span>
		<a href="https://twitter.com/42born2code?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">Twitter</a>
		<span style="color:black"> ☆⋆｡𖦹°‧★ </span>
	</v-footer>
=======
	<v-app id="home">
		<NavBar>
			<v-container fluid>
				<div class="head">
					<v-row>
						<v-col cols="5">
							<div style="position: relative" clas="mt-16">
								<h1 class="text-grey">Hello,</h1>
								<h1 class="text-grey">Welcome to ft_transcendence of</h1>
								<span class="text-grey">Théo, Gaëlle, Semiha, Noémie and ?</span><br />
								<v-btn title dark class="text-yellow mt-8" variant="outlined"></v-btn>
							</div>
						</v-col>
					</v-row>
				</div>
			</v-container>
		</NavBar>
	</v-app>
>>>>>>> 6c47f89 (suite tuto to fix)
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
	data() {
		return {
		};
	},
});


</script>
<!-- <script nomodule="">!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",(function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()}),!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();</script> -->
<!-- <script nomodule="" crossorigin="" id="vite-legacy-polyfill" src="/assets/polyfills-legacy.6f6a2d61.js"></script> -->
<!-- <script nomodule="" crossorigin="" id="vite-legacy-entry" data-src="/assets/index-legacy.aeef6c48.js">System.import(document.getElementById('vite-legacy-entry').getAttribute('data-src'))</script> -->


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
<<<<<<< HEAD

.teamLeader {
	font-weight: bold;
	color: darkmagenta;
}

#authButton:hover {
	background-color: black;
	box-shadow: 6px 6px 0px rgba(0, 0, 0);
	/* box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.5); */
	border: double;
	span {
		color:white !important;
	}
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

a {
	color:black;
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
}
@media (min-width: 30rem)
.site-header {
    margin-bottom: 0.5rem;
}
.site-header {
    margin-bottom: 0;
    min-height: -moz-fit-content;
    min-height: fit-content;
    padding-top: 1.5rem;
}
*, :before, :after {
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
    --tw-ring-color: rgb(59 130 246 / .5);
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
}
*, :before, :after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
}


=======
.head.after{
	content: " ";
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 50%;
	background: black;
	transform: skew(0deg, -6deg);
}
>>>>>>> 6c47f89 (suite tuto to fix)
</style>

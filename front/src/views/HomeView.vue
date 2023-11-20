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
		<NavBar></NavBar>																												// Top black bar with menu items
		<v-container fluid>
			<div class="head">
				<v-row>
				<v-col cols="5">
					<div style="position: relative" clas="mt-16">
						<br />
						<h1 class="text-white">Welcome</h1>
						<h1 class="text-grey">to</h1>
						<h1 class="text-white">ft_transcendence</h1>
						<h1 class="text-grey">of</h1>
						<span class="text-grey">Théo, Gaëlle, Semiha, Noémi and Ismaël</span><br />
						<v-btn title dark class="text-orange mt-8" variant="outlined" rounded>Contact us</v-btn>
					</div>
				</v-col>
				<v-col cols="2">
					<div style="position: absolute;z-index: 9999;bottom: 0;margin-left: auto;margin-right: 0;left: 0;right: 0;text-align: center;">
						<v-icon>fas fa-angle-double-down</v-icon>
					</div>
				</v-col>
				<v-col cols="5">
					<div style="position: relattive;z-index: 9999;" class="mt-16">
						<v-img src="Cats.jpg" contain max-height="300"></v-img>
					</div>
				</v-col>
				</v-row>
			</div>
			<v-col cols="12" class="mt-16" id="about">
				<div>
					<v-row>
						<v-col cols="12" sm="6">
							<div class="egg">
								<v-img src="PongLogo.png" max-height="150" ></v-img>
								
							</div>
						</v-col>
						<v-col cols="12" sm="6">
							<h5 class="mt-16">About us</h5>
							<div style="width: 120px">
								<v-slider color="orange" >
								</v-slider>
							</div>
							<h4 class="mt-n4">We are fans of Norminet and Omori world</h4>
							<p class="text-grey">
								Vous savez, je ne crois pas qu'il y ait de bonne ou de mauvaise situation...
							</p>
							<br />
							<p class="text-grey">
								Scribe c'est bien comme situation?
							</p>
							<router-link to="/secret" tag="v-btn">
					            <v-btn rounded color=orange>
									Discover best of norminet
								</v-btn>
					        </router-link>


						</v-col>
					</v-row>
				</div>
			</v-col>
			<div class="text-center mt-4">
				<h2>What we do</h2>
				<div style="width: 120px; margin: 0 auto;">
					<v-slider color="orange"></v-slider>
				</div>
			</div>
			<v-col cols="12" class="padd" id="portfolio">
				<div class="first" id="project">
					<v-row>
						<v-col cols="12">
							<div class="child">
								<v-btn ico="fas fa-laptop" color=orange class="text-white"></v-btn>
								<h3 class="ml-3 mt-4">Pong game</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									Created by Allan Alcorn<br />released in 1972<br />by Atari
								</p>
							</div>
							<div class="child">
								<v-btn ico="fas fa-mobile-alt" color=orange class="text-white"></v-btn>
								<h3 class="ml-3 mt-4">Chat</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									blabla<br />blabla<br />blabla
								</p>
							</div>
							<div class="child">
								<v-btn ico="fas fa-camera" color=orange class="text-white"></v-btn>
								<h3 class="ml-3 mt-4">Photography</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									blabla<br />blabla<br />blabla
								</p>
							</div>
						</v-col>
					</v-row>
					<v-divider></v-divider>
				</div>
			</v-col>
			<v-col cols="12" sm="12" id="services">
				<div class="d-flex justify-center mb-6">
					<v-btn color=orange class="mr-2">All</v-btn>
					<v-btn class="mr-2" variant="tonal">Norminet</v-btn>
					<v-btn class="mr-2" variant="tonal">Babache</v-btn>
					<v-btn class="mr-2" variant="tonal">Moulinet</v-btn>
					<v-btn variant="tonal">Tylung</v-btn>
				</div>
			</v-col>
			<v-col cols="12" class="imgHover">
				<v-row class="fill-height" text-align="center" justify="center">
					<template v-for="(item, i) in items" :key="i">
						<v-col cols="12" md="4">
							<v-hover v-slot="{isHovering, props}">
								<v-card :elevation="isHovering ? 12: 2" :class="{'on-hover' : isHovering}" v-bind="props">
									<v-img :src="item.img" height="225px" cover></v-img>
								</v-card>
							</v-hover>
						</v-col>
					</template> 
				</v-row>
			</v-col>
			<v-col cols="12" sm="12">
				<div class="d-flex jusify-center mb-6">
					<v-btn color=orange class="mt-4">Load More</v-btn>
				</div>
			</v-col>
			<v-col cols="12" id="page">
				<div class="pre">
					<v-row>
						<v-col cols="12" sm="4">
							<v-card class="mv-auto" max-width="344" hight="">
								<v-img src="Cats.jpg" height="200px" cover></v-img>
								<v-card-title>We provide you the best</v-card-title>
								<v-card-subtitle>
									By Dream Team | november 30th 2023
								</v-card-subtitle>
								<v-card-text>
									bla bla bla bla bla
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</div>
			</v-col>
			<v-col cols="12" id="biog">
				<div class="hire">
					<v-row>
						<v-col cols="12" sm="8">
							<h1 class="mt-9">Hire us for your awesome projects</h1>
							<p class="text-grey">
								Bla bla bla bla bla bla bla bla bla
							</p>
						</v-col>
						<v-col cols="12" sm="4">
							<v-btn color=orange class="mt-15">Hire us</v-btn>
						</v-col>
					</v-row>
				</div>
			</v-col>
			<v-col cols="12" sm="12" class="px-16" id="contact">
				<v-row>
					<v-col cols="12" sm="4">
						<div class="child">
							<h1>Contact info.</h1>
							<v-btn icon="fas fa-map-marker-alt" class="mt-10" variant="outlined"></v-btn><br />
							<span class="text-caption">Positive quote</span><br />
							<v-btn icon="fas fa-phone-alt" class="mt-10" variant="outlined"></v-btn><br />
							<span class="text-caption">42 42 42</span><br />
							<v-btn icon="fas fa-envelope" class="mt-10" variant="outlined"></v-btn><br />
							<span class="text-caption">hello@akatsuki.com</span><br />
						</div>
					</v-col>
					<v-col cols="12" sm="¨8">
						<h1 class="mt-8">Send your message</h1>
						<v-divider></v-divider>
						<span class="text-caption">
							Vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation.
							Moi, si je devais résumer ma vie aujourd’hui avec vous, je dirais que c’est d’abord des rencontres.
							Des gens qui m’ont tendu la main, peut-être à un moment où je ne pouvais pas, où j’étais seul chez moi.
							Et c’est assez curieux de se dire que les hasards, les rencontres forgent une destinée...
							Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste,
							parfois on ne trouve pas l’interlocuteur en face je dirais, le miroir qui vous aide à avancer.
							Alors ça n’est pas mon cas, comme je disais là, puisque moi au contraire, j’ai pu ;
							et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie... je ne suis qu’amour !
							Et finalement, quand des gens me disent « Mais comment fais-tu pour avoir cette humanité ? »,
							je leur réponds très simplement que c’est ce goût de l’amour,
							ce goût donc qui m’a poussé aujourd’hui à entreprendre une construction mécanique...
							mais demain qui sait ?
							Peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi.
						</span>
						<v-row class="mt-10">
							<v-col cols="12" sm="6">
								<v-text-field label="Name" persisten-hint variant="outlined"></v-text-field>
							</v-col>
							<v-col cols="12" sm="6">
								<v-text-field label="Phone No" persisten-hint variant="outlined"></v-text-field>
							</v-col>
						</v-row>
						<v-textarea label="Message" persisten-hint variant="outlined"></v-textarea>
						<v-btn color=orange class="mt-2">Submit Now</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-container>
		<FooterView></FooterView>
	</v-app>
>>>>>>> 6c47f89 (suite tuto to fix)
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
<<<<<<< HEAD
<<<<<<< HEAD
	data() {
		return {
		};
=======

=======
	setup(){
		return {
			slider2: 50, 
			items: [
				{
					img: "Cats.jpg",
				},
				{
					img: "OmoriWallpaper00.jpg"
				},
				{
					img: "OmoriWallpaper01.jpg"
				},
				{
					img: "OmoriWallpaper02.jpg"
				},
				{
					img: "OmoriWallpaper03.jpg"
				},
			],
		}
	},
>>>>>>> ff1c0ad (video at 21:38)
	components: {
		NavBar	
>>>>>>> 9e87f6d (tuto)
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
<<<<<<< HEAD
>>>>>>> 6c47f89 (suite tuto to fix)
=======
.egg{
	display: block;
	margin-left: 100px;
	margin-top: 50px;
	width: 356px;
	height: 300px;
	background-color: orange;
	border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}
.first{
	width: 100%;
	height: 200px;
	text-align: center;
	padding: 2rem 2rem;

}
.child{
	display: inline-block;
	padding: 2rem 1 rem;
	vertical-align: middle;
	text-align: center;
	margin-right: 8px;
}
.imgHover{
	padding: 0 200px;
}
.pre{
	width: 100%;
	height: 300px;
	text-align: center;
	padding: 0 200px;
	background-color: #F5F5F5;

}
.hire{
	width: 100%;
	height: 200px;
	padding: 0 200px;
	background-color: #e9e9e9;
	margin-top: -24px;
}
>>>>>>> ff1c0ad (video at 21:38)
</style>

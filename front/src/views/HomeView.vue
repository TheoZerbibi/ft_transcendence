<template>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 62efd17 (header lightbulb photo added)
=======
	<!--Header avec l'ampoule a tester-->
>>>>>>> 46a40e3 (core:feat clean profile page, add borderes)
=======
	<!--Header avec l'ampoule a tester-->
>>>>>>> 5d4223e (core:feat clean profile page, add borderes)
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
=======
	<v-container class="fill-height">
		<v-row align="center" justify="center" class="fill-height">
			<v-col cols="12" sm="4">
				<h1 class="neonPolice">Welcome to 
				<br />STING team's
				<br />ft_transcendence</h1>
				<br />
				<br />
				<br />
				<v-btn
					prepend-icon="mdi-check-circle"
					class="text-capitalize" 
					rounded="xl"
					color=#3EBBB9
>>>>>>> ef5589f (homepage title, button to 42 intra and font police)
=======
	<div class="d-flex justify-center">
		<v-card class="homepage"  variant="tonal" color="green darken-4" width="600" >
=======
		<v-row align="center" justify="center" class="fill-height">
		<v-card class="homepage text-center rounded-card"  variant="tonal" color="green darken-4" width="600">
>>>>>>> f9c0ccd (homepage prototype dome)
			<v-card-item>	
				<v-card-title class="title">	
=======
=======
	<header>
		<p>This is a header</p>
	</header>
<<<<<<< HEAD
>>>>>>> 14a6c34 (add header and footer in homepage)
=======
	<nav>
		<p>This is a navbar to display after authentification, vertically left better?</p>
		<!--Cf ul and li balises-->
	</nav>
>>>>>>> ee218da (navbar homepage html prototype)
=======
>>>>>>> 027b4cc (core:feat homepage almost done)
	<v-row align="center" justify="center" class="fill-height" id="background">
		<v-card class="homepage text-center blurred-card rounded-card" variant="tonal" width="600">
			<v-card-item>
				<v-card-title class="title">
<<<<<<< HEAD
>>>>>>> 3b9f6f4 (clean files)
					<p class="neonPolice">Welcome to STING's ft_transcendence</p>
=======
					<p class="neonPolice">Welcome to NSTG's ft_transcendence</p>
>>>>>>> 2852cf3 (isma out)
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
<<<<<<< HEAD
					color="green darken-4"
>>>>>>> 9c6a256 (add kittens in homepage^^)
=======
					color="#C306DF"
>>>>>>> 374b499 (/colors page added)
					variant="outlined"
					size="x-large"
<<<<<<< HEAD
<<<<<<< HEAD
					href="https://intra.42.fr"
<<<<<<< HEAD
<<<<<<< HEAD
					target="_blank">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
					<span class="neonPolice">
						💡 Sign in with 42
					</span>
=======
						<div class ="neonPolice">
							&#129418; Authenticate with 42
						</div>
>>>>>>> 1f20d30 (les icons fonctionnentgit add .git add .git add . <3 <3 <3 jvais en mettre PAAAAARTOUT)
=======
=======
					href="/auth/signup"
<<<<<<< HEAD
>>>>>>> 0bc9e74 (chore: Fix conflict)
					target="_blank"
=======
>>>>>>> 33253f6 (fix(back): Remove target blank)
=======
					@click="redirectToOAuth"
>>>>>>> 7dd47b2 (fix: Fix for rebase)
				>
<<<<<<< HEAD
					<div class="neonPolice">&#129418; Authenticate with 42</div>
>>>>>>> 3b9f6f4 (clean files)
=======
					<div class="neonPolice">&#129418; <span class="auth">Authenticate with 42</span></div>
>>>>>>> 66803a1 (shadow and color change when hover auth button)
=======
					target="_blank">
					<span class="neonPolice">
						💡 Sign in with 42
					</span>
>>>>>>> 374b499 (/colors page added)
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	<HomepageFooter></HomepageFooter>
=======
	<HomepageFooter />
>>>>>>> 0bc9e74 (chore: Fix conflict)
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
		<NavBar></NavBar>
		<v-container fluid>
			<div class="head">
				<v-row>
					<v-col cols="5">
						<div style="position: relative" clas="mt-16">
							<br />
							<h1 class="text-white">Welcome</h1>
							<h1 class="text-orange">to</h1>
							<h1 class="text-white">ft_transcendence</h1>
							<h1 class="text-orange">of</h1>
							<span class="text-grey">Théo, Gaëlle, Semiha, Noémi and Ismaël</span><br />
							<v-btn title dark class="text-orange mt-8" variant="outlined" rounded>Contact us</v-btn>
						</div>
					</v-col>
					<v-col cols="2">
						<div style="position: absolute;z-index: 9999;bottom: 0;margin-left: auto;margin-right: 0;left: 0;right: 0;text-align: center;">
							<v-icon>fas fa-paw</v-icon>
						</div>
					</v-col>
					<v-col cols="5">
						<div style="position: relative;z-index: 9999;" class="mt-16">
							<v-img src="CatsRounded.png" contain max-height="300" ></v-img>
						</div>
					</v-col>
				</v-row>
			</div>
			<v-col cols="12" class="mt-16" id="project">
				<div>
					<v-row>
						<v-col cols="12" sm="6">
							<div class="egg">
								<v-img src="PongLogo.png" max-height="150" ></v-img>
								
							</div>
						</v-col>
						<v-col cols="12" sm="6">
							<h2 class="text-orange">The project</h2>
							<h5 class="mt-16">ft_transcendence</h5>
							<div style="width: 120px">
								<v-slider color="orange" >
								</v-slider>
							</div>
							<h4 class="mt-n4">This project is about creating a website for the mighty Pong contest!</h4>
							<p class="text-grey">
								Created by Allan Alcorn, released in 1972 by Atari<br />
								It will provide you a nice user interface, a chat, and real-time multiplayer online games!
							</p>
							<br />
					            <v-btn class="text-capitalize" rounded color=orange href="https://cdn.intra.42.fr/pdf/pdf/103402/en.subject.pdf" target="_blank">
									Open the intra project subject
								</v-btn>
						</v-col>
					</v-row>
				</div>
			</v-col>
			<div class="text-center mt-4">
				<h2 class="text-yellow">The tools of our projects</h2>
				<div style="width: 120px; margin: 0 auto;">
					<v-slider color="orange"></v-slider>
				</div>
			</div>
			<v-col cols="12" class="padd" id="tools">
				<div class="first" id="project">
					<v-row>
						<v-col cols="12">
							<div class="child">
								<v-btn ico="fas fa-laptop" color=orange class="text-white" rounded variant="outlined"></v-btn>
								<h3 class="ml-3 mt-4">Backend</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									NestJS<br />Prisma<br />Redis<br />SocketIO
								</p>
							</div>
							<div class="child">
								<v-btn ico="fas fa-mobile-alt" color=orange class="text-white" rounded variant="outlined"></v-btn>
								<h3 class="ml-3 mt-4">Frontend</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									Vue3<br />Vuetify<br />Vite<br />Pinia
								</p>
							</div>
							<div class="child">
								<v-btn ico="fas fa-camera" color=orange class="text-white" rounded variant="outlined"></v-btn>
								<h3 class="ml-3 mt-4">Game</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									SocketIO<br />NestJS<br />Pinia<br />P5JS
								</p>
							</div>
							<div class="child">
								<v-btn ico="fas fa-camera" color=orange class="text-white" rounded variant="outlined"></v-btn>
								<h3 class="ml-3 mt-4">Chat</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									SocketIO<br />NestJS<br /><br /><br />
								</p>
							</div>
							<div class="child">
								<v-btn ico="fas fa-camera" color=orange class="text-white" rounded variant="outlined"></v-btn>
								<h3 class="ml-3 mt-4">Database</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									Prisma<br />Postgres<br /><br /><br />
								</p>
							</div>

						</v-col>
					</v-row>
					<v-divider></v-divider>
				</div>
			</v-col>
			<div class="text-center mt-4">
				<h2 class="text-green">The team</h2>
				<v-col cols="12" sm="12" id="team">
					<div class="d-flex justify-center mb-6">
						<v-btn color=green class="text-capitalize" variant="outlined" rounded>Starring:</v-btn>
						<v-btn color=orange class="text-capitalize" variant="outlined" rounded >Semiha</v-btn>
						<v-btn color=orange class="text-capitalize" variant="outlined" rounded>Théo</v-btn>
						<v-btn color=orange class="text-capitalize" variant="outlined" rounded>Ismaël</v-btn>
						<v-btn color=orange class="text-capitalize" variant="outlined" rounded>Noémi</v-btn>
						<v-btn color=orange class="text-capitalize" variant="outlined" rounded>Gaëlle</v-btn>
					</div>
				</v-col>
				<!-- <v-col cols="12" class="IntraPictures"> -->



					<!-- <div style="margin-top: 5px;width: 100%;"> -->
						<!-- <ul  style="display: grid;grid-template-columns:repeat(5,1fr);"> -->
							<!-- <li v-for="(item,index) in intraPictures" style="width: 20%;display: inline" > -->
							  <!-- <img v-bind:src="item.photo"> -->
							<!-- </li> -->
						<!-- </ul> -->
					<!-- </div> -->


					<!-- <v-row class="fill-height" text-align="center" justify="center"> -->
						<!-- <template v-for="(intraPictures, i) in intraPictures" :key="i"> -->
							<!-- <v-col cols="12" md="4"> -->
								<!-- <v-hover v-slot="{isHovering, props}"> -->
									<!-- <v-card :elevation="isHovering ? 12: 2" :class="{'on-hover' : isHovering}" v-bind="props"> -->
										<!-- <v-img :src="item.photo" alt="Image" height="225px" cover></v-img> -->
									<!-- </v-card> -->
								<!-- </v-hover> -->
							<!-- </v-col> -->
						<!-- </template>  -->
					<!-- </v-row> -->









				<!-- </v-col> -->
			</div>
			<v-col cols="12" sm="12">
				<div class="d-flex jusify-center mb-6">
					<v-btn color=orange class="mt-4" rounded>Load More</v-btn>
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
							<v-btn color=orange class="mt-15" rounded>Hire us</v-btn>
						</v-col>
					</v-row>
				</div>
			</v-col>
			<v-col cols="12" sm="12" class="px-16" id="contact">
				<v-row>
					<v-col cols="42" sm="4">
						<div class="child">
							<h1>Contact info</h1>
							<v-row>
								<v-col>
									<v-btn icon="fas fa-map-marker-alt" class="mt-10" variant="outlined"></v-btn><br />
									<span class="text-caption">Positive quote</span>
								</v-col>
								<v-col>
									<v-btn icon="fas fa-phone-alt" class="mt-10" variant="outlined"></v-btn><br />
									<span class="text-caption">42 42 42</span>
								</v-col>
								<v-col>
									<v-btn icon="fas fa-envelope" class="mt-10" variant="outlined"></v-btn><br />
									<span class="text-caption">hello@akatsuki.com</span>
								</v-col>
							</v-row>
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
								<v-text-field label="Name" persisten-hint variant="outlined" rounded></v-text-field>
							</v-col>
							<v-col cols="12" sm="6">
								<v-text-field label="Phone No" persisten-hint variant="outlined" rounded></v-text-field>
							</v-col>
						</v-row>
						<v-textarea label="Message" persisten-hint variant="outlined" rounded></v-textarea>
						<v-btn color=orange class="mt-2" rounded>Submit Now</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-container>
		<FooterView></FooterView>
	</v-app>
>>>>>>> 6c47f89 (suite tuto to fix)
=======
	<div>
		<h1>Home Page</h1>
		<v-btn @click="$router.push('/portfolio')" class="text-capitalize" rounded color=orange variant="outlined">Go to portfolio</v-btn>
		<br />
		<button class="button button1">2px</button>
		<button class="button button2">4px</button>
		<button class="button button3">8px</button>
		<button class="button button4">12px</button>
		<button class="button button5">50%</button>
	</div>
<<<<<<< HEAD
>>>>>>> eaeb1b1 (move portfolio homepage to /portfolio)
=======
	
>>>>>>> 4efe178 (tests on homepage)
=======
					<template v-slot:prepend>
    				    <v-icon color="success"></v-icon>
      				</template>
=======
					<template v-slot:prepend>
    				    <v-icon color="success"></v-icon>
    	  			</template>
>>>>>>> 9c6a256 (add kittens in homepage^^)
						<div class ="neonPolice">
						Authenticate with 42
						</div>
				</v-btn>
<<<<<<< HEAD
			</v-col>
		</v-row>
=======
	<v-container class="homepage">
			<h1 class="neonPolice">Welcome to STING team's ft_transcendence</h1>
			<v-btn
				prepend-icon="mdi-check-circle"
				class="text-capitalize" 
				rounded="xl"
				color=#3EBBB9
				variant="outlined"
				size="x-large"
				href="https://intra.42.fr"
				target="_blank">
				<template v-slot:prepend>
    			    <v-icon color="success"></v-icon>
      			</template>
					<div class ="neonPolice">
					Sign in with 42
					</div>
			</v-btn>
>>>>>>> 6601571 (git reset)
	</v-container>
>>>>>>> ef5589f (homepage title, button to 42 intra and font police)
=======
			</v-card-actions>
		</v-card>
<<<<<<< HEAD
	</div>
>>>>>>> 9c6a256 (add kittens in homepage^^)
=======
	</v-row>
>>>>>>> f9c0ccd (homepage prototype dome)
=======
=======
	<aside>
		<p>This is an aside section</p>
	</aside>
>>>>>>> 62c6d84 (add margin for neonPolice)
	<footer>
		<p>This is a footer</p>
		<a href="https://www.instagram.com" target="_blank">Instagram </a>
		<a href="https://www.facebook.com" target="_blank">Facebook </a>
		<a href="https://www.twitter.com" target="_blank">Twitter </a>
	</footer>
>>>>>>> 14a6c34 (add header and footer in homepage)
=======
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
>>>>>>> 027b4cc (core:feat homepage almost done)
=======
	<hello-world />
>>>>>>> c80165e (fix: github issue)
=======
	<Footer />
>>>>>>> 526132c (fix: Move footer in component)
=======
	<Footer />
>>>>>>> 72d37c9 (fix: Move footer in component)
</template>

<script lang="ts">
import Footer from '../components/utils/Footer.vue';
/**
 * Generates a random string of the specified length.
 * @param {number} length The length of the random string.
 * @returns {string} The random string.
 */
 function makeid(length: number): string {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
// Components
import NavBar from '../components/utils/NavBar.vue';
// import FooterBar from '../components/utils/FooterBar.vue';

>>>>>>> d21abb4 (changes on front)
export default defineComponent({
=======
export default {
>>>>>>> 7dd47b2 (fix: Fix for rebase)
	name: 'HomeView',
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	data() {
		return {
		};
=======

<<<<<<< HEAD
=======
	setup(){
		return {
			slider2: 50,
			intraPictures: [
				{
					id: 1,
					picture: "https://cdn.intra.42.fr/users/d78eaeaafd38e03543f1c757ad8b070e/seozcan.jpg",
				},
				{
					id: 2,
					img: "https://cdn.intra.42.fr/users/ef89183628c15b9229bf141ebd455ba9/thzeribi.jpg",
				},
				{
					id: 3,
					img: "https://cdn.intra.42.fr/users/166ae900b2c48bda6db10199f5b1efb4/iguidado.jpg",
				},
				{
					id: 4,
					img: "https://cdn.intra.42.fr/users/96c6292bd2445ca46c9ce03ddb6f8572/nfauconn.jpg"
				},
				{
					id: 5,
					img: "https://cdn.intra.42.fr/users/c2b48b00d1529ccb8e7a4296ec23b8ee/grannou.jpg"
				},
			],
		}
	},
>>>>>>> ff1c0ad (video at 21:38)
	components: {
<<<<<<< HEAD
		NavBar	
>>>>>>> 9e87f6d (tuto)
=======
		NavBar,
		// FooterBar
>>>>>>> d21abb4 (changes on front)
	},
=======
export default defineComponent({
	name: 'HomeView',
>>>>>>> eaeb1b1 (move portfolio homepage to /portfolio)
=======
	data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
>>>>>>> 027b4cc (core:feat homepage almost done)
=======
	data() {
		return {
		};
	},
>>>>>>> f5dd314 (core:feat /secret done)
=======
	components: { Footer },
<<<<<<< HEAD
>>>>>>> 526132c (fix: Move footer in component)
=======
	components: { Footer },
>>>>>>> 72d37c9 (fix: Move footer in component)
});

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 62efd17 (header lightbulb photo added)

=======
	data() {
		return {};
	},
	methods: {
		redirectToOAuth() {
			const clientId = import.meta.env.VITE_API42_UID;
			const redirectUri = import.meta.env.VITE_API42_REDIRECT_URI;
			const responseType = 'code';
			const scope = 'public';
			const state = makeid(32);

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
>>>>>>> 7dd47b2 (fix: Fix for rebase)
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
<<<<<<< HEAD
<<<<<<< HEAD

.homepage {
	display: flex;
	align-items: center;
	flex-direction: column;
<<<<<<< HEAD
<<<<<<< HEAD
	/* background: linear-gradient(90deg, #8360c3, #2ebf91); */
=======
.head{
	position: relative;
	text-align: center;
	padding: 12px;
	margin-bottom: 6px;
	height: 400px;
	width: 100%;
	/* color: white; */
>>>>>>> 61dd42e (head fixed + rounded picture)
}

.title {
	display: flex;
	align-items: flex-start;
	margin: 20px;
	padding: 20px;
}
<<<<<<< HEAD
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


<<<<<<< HEAD
=======
.head.after{
=======
.head:after{
>>>>>>> 61dd42e (head fixed + rounded picture)
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
.IntraPictures{
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
=======
<style scoped>
=======
<style>
>>>>>>> f798f8e (chore: Add OMORI police)
=======

>>>>>>> 2852cf3 (isma out)
.homepage {
	display: flex;
	align-items: center;
	flex-direction: column;
	/* background: linear-gradient(90deg, #8360c3, #2ebf91); */
	background-color: transparent;
	backdrop-filter: blur(3px);
	padding: 16px;
=======
	background: linear-gradient(90deg, #8360c3, #2ebf91);
>>>>>>> 027b4cc (core:feat homepage almost done)
=======
	/* background: linear-gradient(90deg, #8360c3, #2ebf91); */
>>>>>>> 4ecaeef (homepage done)
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
<<<<<<< HEAD
=======
}

#authButton:hover span {
	color: white !important;
>>>>>>> 8f38e0e (chore: Fix linter error)
}
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
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

<<<<<<< HEAD
	.button1 {border-radius: 2px;}
	.button2 {border-radius: 4px;}
	.button3 {border-radius: 8px;}
	.button4 {border-radius: 12px;}
	.button5 {border-radius: 50%;}
>>>>>>> eaeb1b1 (move portfolio homepage to /portfolio)
=======
>>>>>>> ef5589f (homepage title, button to 42 intra and font police)
=======
>>>>>>> 452e6ff (page team prototype done)
=======
>>>>>>> 3b9f6f4 (clean files)
=======

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
<<<<<<< HEAD
>>>>>>> 66803a1 (shadow and color change when hover auth button)
=======

<<<<<<< HEAD
>>>>>>> 027b4cc (core:feat homepage almost done)
=======
a {
	color:black;
}

<<<<<<< HEAD
>>>>>>> 65f5147 (footer in black police)
=======
>>>>>>> 62efd17 (header lightbulb photo added)
=======
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
>>>>>>> 8f38e0e (chore: Fix linter error)
</style>
=======
// Components
import HelloWorld from '../components/main/HelloWorld.vue';

export default defineComponent({
	name: 'HomeView',

	components: { HelloWorld },
});
</script>
>>>>>>> c80165e (fix: github issue)

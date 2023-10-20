<template>
	<v-app id="home">
		<NavBar></NavBar>																												// Top black bar with menu items
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
								<v-btn ico="fas fa-laptop" color=orange class="text-white" rounded></v-btn>
								<h3 class="ml-3 mt-4">Pong game</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									Created by Allan Alcorn<br />released in 1972<br />by Atari
								</p>
							</div>
							<div class="child">
								<v-btn ico="fas fa-mobile-alt" color=orange class="text-white" rounded></v-btn>
								<h3 class="ml-3 mt-4">Chat</h3>
								<p class="text-grey ml-3 mt-4 text-caption">
									blabla<br />blabla<br />blabla
								</p>
							</div>
							<div class="child">
								<v-btn ico="fas fa-camera" color=orange class="text-white" rounded></v-btn>
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
					<v-btn color=orange class="mr-2" rounded>All</v-btn>
					<v-btn color=orange class="mr-2" variant="tonal" rounded>Norminet</v-btn>
					<v-btn color=orange class="mr-2" variant="tonal" rounded>Babache</v-btn>
					<v-btn color=orange class="mr-2" variant="tonal" rounded>Moulinet</v-btn>
					<v-btn color=orange class="mr-2" variant="tonal" rounded>Tylung</v-btn>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/main/HelloWorld.vue';

export default defineComponent({
	name: 'HomeView',
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
	components: {
		NavBar	
	},
});
</script>

<style scoped>
.v-container{
	padding: 16px 0;
}
.head{
	position: relative;
	text-align: center;
	padding: 12px;
	margin-bottom: 6px;
	height: 400px;
	width: 100%;
	/* color: white; */
}
.head:before{
	content: " ";
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 50%;
	background: black;
	transform: skew(0deg, 6deg);
}
.head:after{
	content: " ";
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 50%;
	background: black;
	transform: skew(0deg, -6deg);
}
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
</style>

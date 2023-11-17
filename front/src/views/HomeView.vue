<template>
	<v-app id="home">
		<NavBar>
			<v-container fluid>
				<div class="head">
					<v-row>
						<v-col cols="5">
							<div style="position: relative" clas="mt-16">
								<h1 class="text-grey">Hello,</h1>
								<h1 class="text-white">Welcome to ft_transcendence of</h1>
								<span class="text-grey">Théo, Gaëlle, Semiha, Noémie and Norminet</span><br />
								<v-btn title dark class="text-yellow mt-8" variant="outlined">Contact us</v-btn>
							</div>
						</v-col>
						<v-col cols="2">
							<div style="position: absolute;z-index: 9999;bottom: 0;margin-left: auto;margin-right: 0;left: 0;right: 0;text-align: center;">
								<v-icon>fas fa angle-double-down</v-icon>
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
									<v-img src="OmoriWallpaper00.jpg" max-height="300"></v-img>
								</div>
							</v-col>
							<v-col cols="12" sm="6">
								<h5 class="mt-16">About us</h5>
								<div style="width: 120px">
									<v-slider v-model="slider2" color="yellow" label="track-color">
									</v-slider>
								</div>
								<h4 class="mt-n4">We are fans of Norminet</h4>
								<h4>and Omori world</h4>
								<p class="text-grey">
									Vous savez, je ne crois pas qu'il y ait de bonne ou de mauvaise situation...
								</p>
								<br />
								<p class="text-grey">
									Scribe c'est bien comme situation?
								</p>
								<v-btn tile dark color="yellow" class="mt-4">
									Download a Norminet picture
								</v-btn>
							</v-col>
						</v-row>
					</div>
				</v-col>
				<div class="text-center mt-4">
					<h2>What we do</h2>
					<div style="width: 120px; margin: 0 auto;">
					<v-slider v-model="slider2" color="yellow" label="track-color"></v-slider>
					</div>
				</div>
				<v-col cols="12" class="padd" id="portfolio">
					<div class="first" id="project">
						<v-row>
							<v-col cols="12">
								<div class="child">
									
								</div>
							</v-col>
						</v-row>
					</div>
				</v-col>
			</v-container>
		</NavBar>
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
	color: white;
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
.egg{
	display: block;
	margin-left: 100px;
	margin-top: 50px;
	width: 356px;
	height: 300px;
	background-color: #FBDF7E;
	border-radius: 50% 50% 50% 50% / 60% 60% 40% 0%;
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

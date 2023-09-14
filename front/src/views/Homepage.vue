<template>
	<v-container class="backgroundWallpaper">
		<v-row class="Title">
			<h1> Welcome to<br> ft_transcendence MEOW team </h1>
		</v-row>

			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
		<v-col>
			<v-img :src="logo" class="my-3" contain height="140"/>
		</v-col>    
		<br>
		    <br>
			<br>
				<br>
				<br>
				<br>
				<br>
				<h4>Starring</h4>

		<!-- Première ligne -->
		<v-row>
		    <v-col v-for="(prenom, index) in prenoms" :key="index" cols="2.5">
		        <!-- Contenu de la colonne -->
		        <v-card class="transparent-background">
		          <v-card-text>
		            {{ prenom }}
		          </v-card-text>
		        </v-card>
		      </v-col>
		    </v-row>
		
		<!-- Deuxième ligne -->
		<v-row>
		    <v-col v-for="(qrCode, index) in qrCodesImgPath" :key="index" cols="2.5">
		        <!-- Contenu de la colonne -->
		        <v-card>
		          <v-card-text>
					<img :src="qrCode" alt="Image" width="100%" />
		            <!-- {{ qrCode }} -->
		          </v-card-text>
		        </v-card>
		    </v-col>
		</v-row>

	</v-container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

// Logo
import logo from '../assets/Cats.jpg'
import backgroundWallpaper from '../assets/PongWallpaper.jpg'

export default defineComponent({
  name: 'Homepage',

  data () {
	return {
	  logo,
	  backgroundWallpaper,
	  prenoms: ['Théo', 'Ismaël', 'Gaëlle', 'Semiha', 'Noémi'],
      qrCodesImgPath: [ 
		'../assets/QRcodeTheo.png',
		'../assets/QRcodeIsmael.png',
		'../assets/QRcodeGaelle.png',
		'../assets/QRcodeSemiha.png',
		'../assets/QRcodeNoemi.png']
	}
  },
})
</script>

<style>
	.title
	{
		color: white;
	}
	.backgroundWallpaper
	{
  		background-image: url('/src/assets/PongWallpaper.jpg');
    	background-size: 100% 100%;
		margin: 0px auto;
    	background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: center;
		background-color: black;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		color: black;
	}
	.transparent-background
	{
		background-color: transparent;
		color: white;
		text-align: center;

	}
</style>
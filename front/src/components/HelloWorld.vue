<template>
	<v-container class="backgroundWallpaper">
		<v-row class="text-center">
			<v-col class="mb-4">
				<h1 class="display-2 font-weight-bold mb-3">
					Welcome to<br> ft_transcendence MEOW team
				</h1>
			</v-col>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
		</v-row>
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
  name: 'HelloWorld',

  data () {
	return {
	  logo,
	  backgroundWallpaper,
	  prenoms: ['Théo', 'Ismaël', 'Gaëlle', 'Semiha', 'Noémi'],
      qrCodesImgPath: [ 
		'/mnt/nfs/homes/grannou/ft_transcendence/front/src/assets/QRcodeTheo.png',
		'/mnt/nfs/homes/grannou/ft_transcendence/front/src/assets/QRcodeIsmael.png',
		'/mnt/nfs/homes/grannou/ft_transcendence/front/src/assets/QRcodeGaelle.png',
		'/mnt/nfs/homes/grannou/ft_transcendence/front/src/assets/QRcodeSemiha.png',
		'/mnt/nfs/homes/grannou/ft_transcendence/front/src/assets/QRcodeNoemi.png']
	}
  },
})
</script>

<style>
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
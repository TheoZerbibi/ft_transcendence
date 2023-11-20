<template>
	<div class="customBackground">
<<<<<<< HEAD
<<<<<<< HEAD
		<v-card class="blurred-card rounded-card">
			<v-col class="largerSize neonPolice">
				<h1>The NSTG team</h1>
=======
		<v-card class="blurred-card">
			<v-col class="title">
				<h1>Welcome to ft_transcendence STING team</h1>
>>>>>>> ef5589f (homepage title, button to 42 intra and font police)
=======
		<v-card class="blurred-card rounded-card">
			<v-col class="largerSize neonPolice">
				<h1>The STING team</h1>
>>>>>>> 452e6ff (page team prototype done)
				<h4>Starring</h4>
				<br />
				<v-row>
					<v-col v-for="(prenom, index) in prenoms" :key="index" cols="2.5">
						<v-card-text class="prenoms">
							{{ prenom }}
						</v-card-text>
					</v-col>
				</v-row>
				<v-row>
					<v-col v-for="(login, index) in logins" :key="index" cols="2.5">
						<v-card-text class="largerSize logins" @click="redirect(login)">
							{{ login }}
						</v-card-text>
					</v-col>
				</v-row>
				<v-row>
					<v-col v-for="(qrcode, index) in qrCodes" :key="index">
						<img class="intraLinks" width="100" :src="qrcode" alt="QRCode" />
					</v-col>
				</v-row>
			</v-col>
		</v-card>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import backgroundWallpaper from '../assets/OmoriTeam.svg';
import QRcodeGaelle from '../assets/QRcodesIntra/QRcodeGaelle.png';
import QRcodeNoemi from '../assets/QRcodesIntra/QRcodeNoemi.png';
import QRcodeSemiha from '../assets/QRcodesIntra/QRcodeSemiha.png';
import QRcodeTheo from '../assets/QRcodesIntra/QRcodeTheo.png';

export default defineComponent({
	name: 'TeamInfo',

	data() {
		return {
			backgroundWallpaper,
<<<<<<< HEAD
			prenoms: ['Noe', 'Semiha', 'Théo', 'Gaëlle'],
			logins: ['nfauconn', 'seozcan', 'thzeribi', 'grannou'],
			qrCodes: [QRcodeNoemi, QRcodeSemiha, QRcodeTheo, QRcodeGaelle],
=======
			prenoms: ['Semiha', 'Théo', 'Ismaël', 'Noé', 'Gaëlle'],
			logins: ['seozcan', 'thzeribi', 'iguidado', 'nfauconn', 'grannou'],
			qrCodes: [QRcodeSemiha, QRcodeTheo, QRcodeIsmael, QRcodeNoemi, QRcodeGaelle],
>>>>>>> 452e6ff (page team prototype done)
		};
	},
	methods: {
		redirect(login: string) {
			this.$router.push({ name: 'TeamProfile', params: { login } });
		},
	},
});
</script>

<style>
<<<<<<< HEAD
<<<<<<< HEAD
.largerSize {
=======
.title {
>>>>>>> ef5589f (homepage title, button to 42 intra and font police)
=======
.largerSize {
>>>>>>> 452e6ff (page team prototype done)
	font-size: larger;
}

.prenoms {
	font-size: larger;
}

.prenoms::first-letter {
	color: purple;
	font-size: 200%;
}

.logins {
	cursor: pointer;
}

.customBackground {
	background-image: url('/src/assets/OmoriWallpaper00.jpg');
	/* background-size: 100% 100%; */
	background-size: 70% 70%;
	margin: 0px auto;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: bottom;
	background-color: black;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 100vh;
	color: black;
}

.blurred-card {
	background-color: transparent; /* Fond transparent */
	backdrop-filter: blur(5px); /* Effet de flou, ajustez la valeur selon votre préférence */
	padding: 16px; /* Ajoutez un peu de marge intérieure pour voir l'effet de flou */
}

.presentation {
	background-color: transparent;
	color: white;
	text-align: center;
}

.intraLinks {
	background-color: transparent;
}

</style>

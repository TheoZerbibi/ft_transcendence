<template>
	<div class="customBackground">
<<<<<<< HEAD
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
<<<<<<< HEAD
				<h1>The STING team</h1>
>>>>>>> 452e6ff (page team prototype done)
=======
				<h1>The NSTG team</h1>
>>>>>>> 2852cf3 (isma out)
				<h4>Starring</h4>
				<br />
=======
		<v-card class="blurred-card">
			<v-col class="Title">
				<h1>Welcome to ft_transcendence STING team</h1>
				<h4>Starring</h4>
>>>>>>> c80165e (fix: github issue)
				<v-row>
					<v-col v-for="(prenom, index) in prenoms" :key="index" cols="2.5">
						<v-card-text class="prenoms">
							{{ prenom }}
						</v-card-text>
					</v-col>
				</v-row>
				<v-row>
					<v-col v-for="(login, index) in logins" :key="index" cols="2.5">
<<<<<<< HEAD
						<v-card-text class="largerSize logins" @click="redirect(login)">
=======
						<v-card-text class="logins" @click="redirect(login)">
>>>>>>> c80165e (fix: github issue)
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
<<<<<<< HEAD
=======
import QRcodeIsmael from '../assets/QRcodesIntra/QRcodeIsmael.png';
>>>>>>> c80165e (fix: github issue)
import QRcodeNoemi from '../assets/QRcodesIntra/QRcodeNoemi.png';
import QRcodeSemiha from '../assets/QRcodesIntra/QRcodeSemiha.png';
import QRcodeTheo from '../assets/QRcodesIntra/QRcodeTheo.png';

export default defineComponent({
	name: 'TeamInfo',

	data() {
		return {
			backgroundWallpaper,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
			prenoms: ['Noe', 'Semiha', 'Théo', 'Gaëlle'],
			logins: ['nfauconn', 'seozcan', 'thzeribi', 'grannou'],
			qrCodes: [QRcodeNoemi, QRcodeSemiha, QRcodeTheo, QRcodeGaelle],
=======
			prenoms: ['Semiha', 'Théo', 'Ismaël', 'Noé', 'Gaëlle'],
			logins: ['seozcan', 'thzeribi', 'iguidado', 'nfauconn', 'grannou'],
			qrCodes: [QRcodeSemiha, QRcodeTheo, QRcodeIsmael, QRcodeNoemi, QRcodeGaelle],
>>>>>>> 452e6ff (page team prototype done)
=======
			prenoms: ['Noe', 'Semiha', 'Théo', 'Gaëlle'],
			logins: ['nfauconn', 'seozcan', 'thzeribi', 'grannou'],
			qrCodes: [QRcodeNoemi, QRcodeSemiha, QRcodeTheo, QRcodeGaelle],
>>>>>>> 2852cf3 (isma out)
=======
			prenoms: ['Semiha', 'Theo', 'Ismaël', 'Noémi', 'Gaëlle'],
			logins: ['seozcan', 'thzeribi', 'iguidado', 'nfauconn', 'grannou'],
			qrCodes: [QRcodeSemiha, QRcodeTheo, QRcodeIsmael, QRcodeNoemi, QRcodeGaelle],
>>>>>>> c80165e (fix: github issue)
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
=======
.Title {
	font-size: larger;
	text-align: center;
	color: black;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}

.prenoms {
	font-size: medium;
	color: black;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
>>>>>>> c80165e (fix: github issue)
}

.prenoms::first-letter {
	color: purple;
	font-size: 200%;
}

.logins {
<<<<<<< HEAD
=======
	font-size: small;
	color: black;
>>>>>>> c80165e (fix: github issue)
	cursor: pointer;
}

.customBackground {
	background-image: url('/src/assets/OmoriWallpaper00.jpg');
<<<<<<< HEAD
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
=======
	background-size: 100% 100%;
	margin: 0px auto;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: center;
	background-color: black;
	display: flex;
	flex-direction: column;
	justify-content: center;
>>>>>>> c80165e (fix: github issue)
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

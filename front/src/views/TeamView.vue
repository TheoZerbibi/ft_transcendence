<template>
	<div class="customBackground">
		<v-card class="blurred-card">
			<v-col class="Title">
				<h1>Welcome to ft_transcendence STING team</h1>
				<h4>Starring</h4>
				<v-row>
					<v-col v-for="(prenom, index) in prenoms" :key="index" cols="2.5">
						<v-card-text class="prenoms">
							{{ prenom }}
						</v-card-text>
					</v-col>
				</v-row>
				<v-row>
					<v-col v-for="(login, index) in logins" :key="index" cols="2.5">
						<v-card-text class="logins" @click="redirect(login)">
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
import QRcodeIsmael from '../assets/QRcodesIntra/QRcodeIsmael.png';
import QRcodeNoemi from '../assets/QRcodesIntra/QRcodeNoemi.png';
import QRcodeSemiha from '../assets/QRcodesIntra/QRcodeSemiha.png';
import QRcodeTheo from '../assets/QRcodesIntra/QRcodeTheo.png';

export default defineComponent({
	name: 'TeamInfo',

	data() {
		return {
			backgroundWallpaper,
			prenoms: ['Semiha', 'Theo', 'Ismaël', 'Noémi', 'Gaëlle'],
			logins: ['seozcan', 'thzeribi', 'iguidado', 'nfauconn', 'grannou'],
			qrCodes: [QRcodeSemiha, QRcodeTheo, QRcodeIsmael, QRcodeNoemi, QRcodeGaelle],
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
}

.prenoms::first-letter {
	color: purple;
	font-size: 200%;
}

.logins {
	font-size: small;
	color: black;
	cursor: pointer;
}

.customBackground {
	background-image: url('/src/assets/OmoriWallpaper00.jpg');
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

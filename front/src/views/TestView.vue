<template>
	<v-container>
		<!-- Utilisez les composants Vuetify pour la mise en page -->
		<v-row>
			<v-col>
				<v-btn @click="generateQRCode">Generate QR Code</v-btn>
			</v-col>
			<v-form @submit.prevent="activateTwoFactorAuthentication" v-if="qrCode">
				<v-text-field v-model="verificationCode" label="Enter Verification Code" required></v-text-field>
				<v-btn type="submit">Activate 2FA</v-btn>
			</v-form>
		</v-row>

		<img :src="`${qrCode}`" v-if="qrCode" />

		<!-- Autres éléments d'interface utilisateur pour gérer la 2FA -->
	</v-container>
	<Snackbar />
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import Snackbar from '../components/layout/Snackbar.vue';
import { useSnackbarStore } from '../stores/snackbar';
import { useUser } from '../stores/user';
import QrcodeVue from 'qrcode.vue';

const snackbarStore = useSnackbarStore();

export default {
	name: 'TestView',
	components: { Snackbar, QrcodeVue },
	setup() {
		const userStore = useUser();
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	data() {
		return {
			qrCode: null,
			verificationCode: '',
		};
	},
	methods: {
		async generateQRCode() {
			const requestOptions = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.JWT}`,
					'Access-Control-Allow-Origin': '*',
				},
			};
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/2fa/generate`,
					requestOptions,
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const qrCodeArrayBuffer = await response.arrayBuffer();
				const qrCodeBase64 = btoa(
					new Uint8Array(qrCodeArrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''),
				);
				this.qrCode = 'data:image/png;base64,' + qrCodeBase64;
			} catch (error) {
				console.error(error);
			}
		},
		async activateTwoFactorAuthentication() {
			const requestBody = { code: this.verificationCode };

			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/2fa/turn-on`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
						},
						body: JSON.stringify(requestBody),
					},
				);

				const result = await response.text();
				console.log(result); // Gérer la réponse du serveur ici
			} catch (error) {
				console.error('Error activating 2FA:', error);
			}
		},
		// Autres méthodes nécessaires
	},
};
</script>

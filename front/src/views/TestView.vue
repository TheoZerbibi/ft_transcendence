<template>
	<v-container>
		<!-- Utilisez les composants Vuetify pour la mise en page -->
		<v-row>
			<v-col v-if="!is2FA">
				<v-btn @click="generateQRCode" v-if="!qrCode">Generate QR Code</v-btn>
			</v-col>
			<v-form @submit.prevent="disableTwoFactorAuthentication" v-if="is2FA">
				<v-text-field v-model="verificationCode" label="Enter Verification Code" required></v-text-field>
				<v-btn type="submit">Disable 2FA</v-btn>
			</v-form>
			<v-form @submit.prevent="activateTwoFactorAuthentication" v-if="qrCode && !is2FA">
				<v-text-field v-model="verificationCode" label="Enter Verification Code" required></v-text-field>
				<v-btn type="submit">Activate 2FA</v-btn>
			</v-form>
		</v-row>

		<img :src="`${qrCode}`" v-if="qrCode && !is2FA" />
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
		const setJWT = (JWT: string) => userStore.setJWT(JWT);
		const user = computed(() => userStore.getUser);
		const is2FA = computed(() => userStore.is2FA);

		return {
			JWT,
			setJWT,
			user,
			is2FA,
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
					console.log(error);
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const qrCodeArrayBuffer = await response.arrayBuffer();
				const qrCodeBase64 = btoa(
					new Uint8Array(qrCodeArrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''),
				);
				this.qrCode = 'data:image/png;base64,' + qrCodeBase64;
			} catch (error) {
				snackbarStore.showSnackbar('Error generating QR Code', 3000, 'red');
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
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
						},
						body: JSON.stringify(requestBody),
					},
				);
				if (!response.ok) {
					const error = await response.json();
					console.log(error);
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				const result = await response.json();
				this.setJWT(result.access_token);
				snackbarStore.showSnackbar(result.message, 3000, 'green');
				this.qrCode = null;
			} catch (error) {
				snackbarStore.showSnackbar('Error activating 2FA', 3000, 'red');
			}
		},
		async disableTwoFactorAuthentication() {
			const requestBody = { code: this.verificationCode };

			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/2fa/turn-off`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
						},
						body: JSON.stringify(requestBody),
					},
				);
				if (!response.ok) {
					const error = await response.json();
					console.log(error);
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				const result = await response.json();
				this.setJWT(result.access_token);
				snackbarStore.showSnackbar(result.message, 3000, 'green');
			} catch (error) {
				snackbarStore.showSnackbar('Error activating 2FA', 3000, 'red');
			}
		},
		// Autres méthodes nécessaires
	},
};
</script>

<template>
	<v-container 
		fill-height
		fluid
		class="d-flex flex-column justify-center align-center"
	>

		<v-row v-show="!is2FA">
			<v-col cols="12" clas="d-flex justify-center align-center">
				<v-sheet class="pa-2 ma-2 d-flex flex-column align-center justify-center" height="80dvh" width="40dvh" color="transparent">
					<v-btn @click="generateQRCode" v-if="!qrCode && !is2FA">Generate QR Code</v-btn>
					<img :src="`${qrCode}`" v-if="qrCode && !is2FA" />
					<v-form @submit.prevent="activateTwoFactorAuthentication" v-if="qrCode && !is2FA" class="d-flex flex-column align-center">
						<v-otp-input variant="solo-filled" v-model="verificationCode" label="Enter Verification Code" required error :loading="loading"/>
						<v-btn type="submit">Activate 2FA</v-btn>
					</v-form>
				</v-sheet>
			</v-col>
		</v-row>

		<v-row v-show="is2FA">
			<v-col cols="12" class="d-flex justify-center align-center">
				<v-sheet  class="pa-2 ma-2 d-flex flex-column align-center justify-center" height="80dvh" width="40dvh" color="transparent">
					<v-form @submit.prevent="disableTwoFactorAuthentication" v-if="is2FA" class="d-flex flex-column align-center">
						<v-otp-input variant="solo-filled" v-if="is2FA" v-model="verificationCode" label="Enter Verification Code" required error :loading="loading"/>
						<v-btn v-if="is2FA" type="submit">Disable 2FA</v-btn>
					</v-form>
				</v-sheet>
			</v-col>
		</v-row>

	</v-container>
	<Snackbar />
</template>

<script lang="ts">
import { useUser } from '../stores/user';
import { computed, defineComponent, ref } from 'vue';
import { useSnackbarStore } from '../stores/snackbar';
import Snackbar from '../components/layout/Snackbar.vue';
import QrcodeVue from 'qrcode.vue';

const snackbarStore = useSnackbarStore();

export default defineComponent({
	name: 'HomeView',
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
	beforeMount() {
		if (!this.JWT || !this.user) {
			return this.$router.push({ name: `Login` });
		}
	},
	data() {
		return {
			qrCode: null,
			verificationCode: '',
			isModalOpen: false,
		};
	},
	methods: {
		redirectToPage(url) {
			window.location.href = url;
		},
		openModal() {
			this.isModalOpen = true;
		},
		closeModal() {
			this.isModalOpen = false;
		},
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
					this.verificationCode = '';
					return;
				}

				const result = await response.json();
				this.setJWT(result.access_token);
				snackbarStore.showSnackbar(result.message, 3000, 'green');
				this.qrCode = null;
				this.verificationCode = '';
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
					this.verificationCode = '';
					return;
				}

				const result = await response.json();
				this.setJWT(result.access_token);
				snackbarStore.showSnackbar(result.message, 3000, 'green');
				this.verificationCode = '';
			} catch (error) {
				snackbarStore.showSnackbar('Error activating 2FA', 3000, 'red');
			}
		},
	},
});
</script>

<style scoped>
</style>

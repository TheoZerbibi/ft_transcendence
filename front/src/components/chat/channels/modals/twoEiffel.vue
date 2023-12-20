<template>
	<v-dialog>

		<template v-slot:activator="{ props }">
			<v-btn 
				flat
				rounded="0"
				:ripple="false"
				width="100%"
				class="align-self-end"
				v-bind="props">
				{{ buttonText }}
			</v-btn>
		</template>


		<template v-slot:default="{ isActive }">
			<v-card class="rounded-0 align-center justify-center">
				<v-card-title>2FA Setup</v-card-title>

				<img cover height="250" :src="`${qrCode}`" v-if="qrCode && !is2FA" />

				<v-icon icon="fas fa-check" color="green" v-if="is2FA && qrCode">2FA has been successfully enabled</v-icon>
				<v-icon icon="fas fa-times" color="red" v-if="!is2FA">2FA has been successfully disabled</v-icon>

				<v-card-actions class="align-center justify-center">
					<v-spacer></v-spacer>
					
					<v-btn
					flat
					rounded="0"
					:ripple="false"
					width="100%"
					@click="generateQRCode" 
					v-if="!qrCode && 
					!is2FA">Generate QR Code</v-btn>
					
					<v-form @submit.prevent="activateTwoFactorAuthentication" v-if="qrCode && !is2FA"
						class="d-flex flex-column align-center">
						<v-otp-input variant="solo-filled" v-model="verificationCode"
							label="Enter Verification Code" required error :loading="loading" />
						<v-btn flat
							rounded="0"
							:ripple="false"
							width="100%" 
						type="submit">Activate 2FA</v-btn>
					</v-form>

					<v-form @submit.prevent="disableTwoFactorAuthentication" v-if="is2FA" 
					class="d-flex flex-column align-center">
						<v-otp-input variant="solo-filled" v-if="is2FA" v-model="verificationCode" 
						label="Enter Verification Code" required error :loading="loading"/>
						<v-btn v-if="is2FA" type="submit">Disable 2FA</v-btn>
					</v-form>

				</v-card-actions>
				<v-card-item>
					<!-- for space -->
				</v-card-item>
			</v-card>
		</template>

	</v-dialog>
</template>

<script lang="ts">
import { useUser } from '../../../../stores/user';
import { computed, defineComponent, ref } from 'vue';
import { useSnackbarStore } from '../../../../stores/snackbar';
import Snackbar from '../../../layout/Snackbar.vue';
import QrcodeVue from 'qrcode.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default defineComponent({
	name: 'modal2FA',
	components: {
		Snackbar,
		QrcodeVue,
	},
	props: {
		show: Boolean,
	},
	emits: ['close-modal'],
	setup() {
		const userStore = useUser();
		const JWT = computed(() => userStore.getJWT);
		const setJWT = (JWT: string) => userStore.setJWT(JWT);
		const user = computed(() => userStore.getUser);
		const is2FA = computed(() => userStore.is2FA);

		const set2FA = (is2FA: boolean) => userStore.set2FA(is2FA);

        const buttonText = computed(() => {
            return is2FA.value ? 'Disable 2FA' : 'Enable 2FA';
        });

		return {
			JWT,
			setJWT,
			user,
			is2FA,
			set2FA,
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
			buttonText: 'Enable 2FA',
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
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					this.verificationCode = '';
					return;
				}

				const result = await response.json();
				this.setJWT(result.access_token);
				snackbarStore.showSnackbar(result.message, 3000, 'green');
				this.qrCode = null;
				this.verificationCode = '';
				this.buttonText = 'Disable 2FA';
				this.set2FA(true);
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
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					this.verificationCode = '';
					return;
				}

				const result = await response.json();
				this.setJWT(result.access_token);
				snackbarStore.showSnackbar(result.message, 3000, 'green');
				this.verificationCode = '';
				this.buttonText = 'Enable 2FA';
				this.set2FA(false);
			} catch (error) {
				snackbarStore.showSnackbar('Error activating 2FA', 3000, 'red');
			}
		},
		cancel() {
			this.$emit('close-modal');
		},

	},
});
</script>

<style scoped>
.v-btn {
	border: black solid thin;
	width: 100%;
	margin-top: 1dvh;
	margin-bottom: 1dvh;
	display: flex;
	position: relative;
}
</style>

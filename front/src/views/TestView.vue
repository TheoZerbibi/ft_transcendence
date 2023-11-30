<template>
	<v-container>
		<!-- Utilisez les composants Vuetify pour la mise en page -->
		<v-row>
			<v-col>
				<v-btn @click="generateQRCode">Generate QR Code</v-btn>
			</v-col>
			<v-col>
				<v-btn @click="activateTwoFactorAuthentication">Activate 2FA</v-btn>
			</v-col>
		</v-row>

		<!-- Utilisez un composant QR Code pour afficher le QR Code -->
		<qrcode :text="qrCodeData" v-if="qrCodeData" />

		<!-- Autres éléments d'interface utilisateur pour gérer la 2FA -->
	</v-container>
	<Snackbar />
</template>

<script lang="ts">
import { computed } from 'vue';
import Snackbar from '../components/layout/Snackbar.vue';
import { useSnackbarStore } from '../stores/snackbar';
import { useUser } from '../stores/user';
import QrcodeVue from 'qrcode.vue'

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
			qrCodeData: null,
			// Autres données nécessaires pour la page 2FA
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
					`http://${import.meta.env.VITE_HOST}:${
						import.meta.env.VITE_API_PORT
					}/2fa/generate`,
					requestOptions,
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					this.cantSkip = false;
					return;
				}

				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		},
		async activateTwoFactorAuthentication() {
			// Appel API pour activer la 2FA
		},
		// Autres méthodes nécessaires
	},
};
</script>

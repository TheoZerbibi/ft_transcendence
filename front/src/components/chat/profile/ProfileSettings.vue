<template>
	<div class="ma-2 d-flex flex-column">
		<v-card-title>Settings</v-card-title>	
		
		<v-btn flat
			rounded="0"
			style="border: black solid thin;"
			:ripple="false"
			@click="showNameChangeModal">
			Change display name
		</v-btn>

		<ProfileNameModal 
			class="modal" 
			v-if="dNameChangeModal" 
			:showModal="dNameChangeModal"
			@change-dname="changeDisplayName"
			@close-modal="dNameChangeName = false">
		</ProfileNameModal>
		
		<v-btn flat
			rounded="0"
			style="border: black solid thin;"
			:ripple="false"
			@click="enable2FA"
			v-if="!user.twoFactorAuth">
			Enable 2FA
		</v-btn>
		<v-btn flat
			rounded="0"
			style="border: black solid thin;"
			:ripple="false"
			@click="enable2FA"
			v-if="user.twoFactorAuth">
			Disable 2FA
		</v-btn>

		<v-btn flat
			rounded="0"
			style="border: black solid thin;"
			:ripple="false" color="red" @click="deleteAccount">
			Delete Account
		</v-btn>
	</div>

	<!-- Error handling -->
	<Snackbar />
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';
import DateViewer from '../../utils/Date.vue';
import ProfileNameModal from '../channels/modals/ProfileNameModal.vue';
import QrcodeVue from 'qrcode.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
		DateViewer,
		ProfileNameModal,
		QrcodeVue,
	},
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		const is2FA = computed(() => userStore.is2FA);

		return {
			JWT,
			user,
			is2FA,
		};
	},
	data() {
		return {
			qrCode: null,
			matchHistory: [],
			newDisplayName: '',
			dNameChangeModal: false as boolean,
		};
	},
	beforeMount() {
		this.fetchMatchHistory();
	},
	methods: {
		fetchMatchHistory: async function () {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/getMyMatchHistory`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					},
				);
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data: any = await response.json();
				this.matchHistory = data;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		redirectToGame(uid: string) {
			this.$router.push({ name: `Game`, params: { uid: uid } });
		},
		changeDisplayName: async function(newDisplayName: string) {
			try {
				if (newDisplayName === '') {
					return;
				}
				console.log('NEW DISPLAY NAME:', newDisplayName);
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							display_name: newDisplayName,
						}),
					},
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					this.dNameChangeModal = false;
					return;
				}
				const data = await response.json();
				snackbarStore.showSnackbar(data.message, 3000, 'green');
				userStore.displayName = newDisplayName;
				this.dNameChangeModal = false;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		enable2FA: async function() {
			try {
				console.log('[PROFILE SETTINGS: ENABLE 2FA TODO');
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		changeAvatar: async function() {
			try {
				console.log('[PROFILE SETTINGS: CHANGE AVATAR TODO');
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		deleteAccount: async function() {
			try {
				console.log('[PROFILE SETTINGS: DELETE ACCOUNT TODO');
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		showNameChangeModal: function() {
			if (this.dNameChangeModal) {
				this.dNameChangeModal = false;
			} else {
				this.dNameChangeModal = true;
			}
		},

	},
};
</script>

<style scoped>
.v-btn {
	border: black solid thin;
	width: 100%;
	margin-top: 1dvh;
	margin-bottom: 1dvh;
}

</style>

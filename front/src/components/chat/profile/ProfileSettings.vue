<template>
	<div class="ma-2 d-flex flex-column">
		<v-card-title>Settings</v-card-title>

		<v-card-actions  class="flex-column align-end justify-center">
			<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false" @click="showNameChangeModal">
				Change display name
			</v-btn>

			<ProfileNameModal
				class="modal" 
				v-if="dNameChangeModal" 
				:showModal="dNameChangeModal"
				@change-dname="changeDisplayName"
				@close-modal="dNameChangeName = false">
			</ProfileNameModal>

			<modal2FA >
			</modal2FA>

			<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false" color="red" @click="deleteAccount">
				Delete Account
			</v-btn>
		</v-card-actions>
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
import modal2FA from '../channels/modals/twoEiffel.vue';

const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
		DateViewer,
		ProfileNameModal,
		modal2FA,
	},
	setup() {
		const userStore = useUser();
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);


		return {
			JWT,
			user,
			userStore,
		};
	},
	data() {
		return {
			matchHistory: [],
			newDisplayName: '',
			dNameChangeModal: false as boolean,
			qrCodeModal: false as boolean,
		};
	},
	beforeMount() {
		this.fetchMatchHistory();
	},
	emits: ['account-deleted'],
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
		changeDisplayName: async function (newDisplayName: string) {
			try {
				if (newDisplayName === '') {
					return;
				}
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
				this.userStore.displayName = newDisplayName;
				this.dNameChangeModal = false;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		deleteAccount: async function () {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/profile`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					},
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				sessionStorage.clear();
				await this.userStore.deleteUser();
				this.$emit('account-deleted');
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		showNameChangeModal: function () {
			if (this.dNameChangeModal) {
				this.dNameChangeModal = false;
			} else {
				this.dNameChangeModal = true;
			}
		},
		show2FAModal: function () {
			if (this.qrCodeModal) {
				this.qrCodeModal = false;
			} else {
				this.qrCodeModal = true;
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

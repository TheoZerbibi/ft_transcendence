<template>
	<v-dialog v-model="dialogOpen">
		<v-card>
			<template v-slot:activator="{ props }">
				<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false" v-bind="props"
					text="User moderation"> </v-btn>
			</template>

			<template v-slot:default="{ isActive }">
				<v-card v-if="selectedUser">
					<v-card-title>
						User moderation of {{ selectedUser.display_name }}
					</v-card-title>
					<v-card-text>

						<!-- Kick -->
						<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false"
							@click="kick(selectedUser.login)">Kick</v-btn>

						<!-- Ban & Unban -->
						<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false"
							v-if="selectedUser.is_banned" @click="unban(selectedUser.login)">Unban </v-btn>
						<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false" v-else
							@click="ban(selectedUser.login)">Ban</v-btn>

						<!-- Mute & Unmute -->
						<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false"
							v-if="selectedUser.is_muted" @click="unmute(selectedUser.login)">Unmute</v-btn>
						<template v-else>
							<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false"
								@click="mute(selectedUser.login, 1)">Mute for 1 hour</v-btn>
							<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false"
								@click="mute(selectedUser.login, 2)">Mute for 2 hours</v-btn>
							<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false"
								@click="mute(selectedUser.login, 6)">Mute for 6 hours</v-btn>
							<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false"
								@click="mute(selectedUser.login, 12)">Mute for 12 hours</v-btn>
							<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false"
								@click="mute(selectedUser.login, 24)">Mute for 24 hours</v-btn>
						</template>

						<!-- Promote & Demote -->
						<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false"
							v-if="!selectedUser.is_admin" @click="promote(selectedUser.login)">Promote</v-btn>
						<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false" v-else
							@click="demote(selectedUser.login)">Demote</v-btn>

					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn flat rounded="0" style="border: black solid thin;" :ripple="false" text="Cancel"
							@click="isActive.value = false"></v-btn>
					</v-card-actions>
				</v-card>
			</template>
		</v-card>
	</v-dialog>
	<!-- Error handling -->
	<Snackbar></Snackbar>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useUser } from '../../../../stores/user';
import { useSnackbarStore } from '../../../../stores/snackbar';
import Snackbar from '../../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		const dialogOpen = ref(false);

		return {
			JWT,
			user,
			dialogOpen,
		};
	},
	components: {
		Snackbar,
	},
	props: {
		selectedChannelName: String,
		selectedChannelUser: Object,
		myUser: Object,
	},
	emits: ['close-modal'],
	computed: {
		selectedChannel() {
			return this.selectedChannelName;
		},
		selectedUser() {
			return this.selectedChannelUser || {
				// valeurs par défaut si selectedChannelUser est null ou undefined
				login: 'fake',
				display_name: 'fake',
				avatar: 'fake',
				is_owner: false,
				is_admin: false,
				is_muted: false,
				is_banned: false,
			};
		}
	},
	data() {
		return {
			selectedMuteDuration: null,
			muteOptions: [
				{ text: '1 hour', value: 1 },
				{ text: '2 hours', value: 2 },
				{ text: '6 hours', value: 6 },
				{ text: '12 hours', value: 12 },
				{ text: '24 hours', value: 24 },
			],
		};
	},
	methods: {
		unban: async function (login: string) {
			this.modUser(login, 'unban');
		},
		ban: async function (login: string) {
			this.modUser(login, 'ban');
		},
		mute: async function (login: string, duration: number) {
			console.log('mute: ', login, duration);
			const dateUntil = new Date();
			const millisecondsToAdd = duration * 3600000; // 1 heure = 3600000 millisecondes

			dateUntil.setTime(dateUntil.getTime() + millisecondsToAdd);

			console.log('mute: ', login, dateUntil);
			this.modUser(login, 'mute', dateUntil);
		},
		unmute: async function (login: string) {
			this.modUser(login, 'unmute');
		},
		kick: async function (login: string) {
			this.modUser(login, 'kick');
		},
		modUser: async function (login: string, chosenAction: string, duration?: Date) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannelName}/settings/admin/mod_user`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							target_login: login,
							action: chosenAction,
							muted_until: duration ? duration : null,
						}),
					}
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();
				snackbarStore.showSnackbar(data.message, 3000, 'green');
				this.dialogOpen = false;
				this.$emit('close-modal');

			} catch (error) {
				console.log(error);
			}
		},
		promote: async function (login: string) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannel}/settings/owner/promote`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							target_login: login,
							action: 'promote',
						}),
					}
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();
				snackbarStore.showSnackbar(data.message, 3000, 'green');
				this.dialogOpen = false;

			} catch (error) {
				console.log(error);
			}
		},
		demote: async function (login: string) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannel}/settings/owner/demote`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							target_login: login,
							action: 'demote',
						}),
					}
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();
				snackbarStore.showSnackbar(data.message, 3000, 'green');
				this.dialogOpen = false;

			} catch (error) {
				console.log(error);
			}
		},
	}
};
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
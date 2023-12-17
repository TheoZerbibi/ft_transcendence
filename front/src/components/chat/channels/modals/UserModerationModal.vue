<template>
	<v-dialog width="500">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" text="User moderation"> </v-btn>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card v-if="selectedUser">
			<v-card-title>
				User moderation of {{ selectedUser.display_name }}
			</v-card-title>
			<v-card-text>
				<!-- Unban / ban -->
				<v-btn v-if="selectedUser.is_banned" @click="unban(selectedUser.login)" >Unban </v-btn>
				<v-btn v-else @click="ban(selectedUser.login)">Ban</v-btn>
				<v-btn v-if="selectedUser.is_muted" @click="unmute(selectedUser.login)">Unmute</v-btn>
				<v-btn v-else @click="mute(selectedUser.login, new Date())">Mute</v-btn>
				<v-btn @click="kick(selectedUser.login)">Kick</v-btn>
				<v-btn v-if="!selectedUser.is_admin" @click="promote(selectedUser.login)">Promote</v-btn>
				<v-btn v-else @click="demote(selectedUser.login)">Demote</v-btn>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
				text="Cancel"
				@click="isActive.value = false"
				></v-btn>
			</v-card-actions>
			</v-card>
		</template>
	</v-dialog>

	<!-- Error handling -->
	<Snackbar></Snackbar>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../../../stores/user';
import { useSnackbarStore } from '../../../../stores/snackbar';
import Snackbar from '../../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
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
	methods: {
		unban: async function (login: string) {
			this.modUser(login, 'unban');
		},
		ban: async function (login: string) {
			this.modUser(login, 'ban');
		},
		mute: async function (login: string, duration: Date) {
			console.log('mute: ', login, duration);
		},
		unmute: async function (login: string) {
			this.modUser(login, 'unmute');
		},
		kick: async function (login: string) {
			this.modUser(login, 'kick');
		},
		modUser: async function(login: string, chosenAction: string) {
			try {
				console.log('[UserModeration] modUser: ', login, chosenAction);
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
				
			} catch (error) {
				console.log(error);
			}
		},
		promote: async function(login: string) {
			try {
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannel}/settings/owner/set_user_as_admin`,
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

			} catch (error) {
				console.log(error);
			}
		},
		close() {
			this.$emit('close-modal');
		},
	}
};
</script>
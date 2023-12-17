<template>

	<!-- Channel Settings -->
	<div v-if="selectedChannelName">
		<v-card-title> Settings of @{{ selectedChannelName }} </v-card-title>
			<v-btn @click="leaveChannel">Leave Channel</v-btn>
			<v-btn v-if="channelUser.is_owner" @click="deleteChannel">Delete channel</v-btn>
			<UserModeration></UserModeration>
			<ChangePwd></ChangePwd>
	</div>

	<div v-else>
		<v-card-title>Settings</v-card-title>
		<v-card-text class="empty-card">
			~ no channel selected ~
		</v-card-text>
	</div>

	<UserModeration
		v-if="showUserModeration"
		:show="showUserModeration"
		@close-modal="showUserModeration = false"
	></UserModeration>

	<ChangePwd
		v-if="showChangePwd"
		:show="showChangePwd"
		@close-modal="showChangePwd = false"
	></ChangePwd>

	<!-- Error handling -->
	<Snackbar></Snackbar>

</template>


<script lang="ts">
import { computed, ref } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

import UserModeration from './UserModeration.vue';
import ChangePwd from './ChangePwd.vue';

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
		UserModeration,
		ChangePwd,
	},
	props: {
		selectedChannelName: String
	},
	data() {
		return {
			channelUser: {} as any,
			showUserModeration: false as boolean,
			showChangePwd: false as boolean,
			pwd: {
				prev: '' as string,
				new: '' as string,
				confirm: '' as string,
			},
		};
	},
	methods: {
		fetchChannelUser: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[fetchChannelUser]: this.channelName is empty');
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.channelName}/access/users/${this.user.login}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				)
				const data = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
				this.channelUser = data;
				console.log('[fetchChannelUser]: channelUser: ', JSON.stringify(this.channelUser));
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
}

</script>
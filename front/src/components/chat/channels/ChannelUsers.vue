<template>
	<div class="channel-channelUsers-container">
		<h2>Users</h2>
		<div class="scrollable-content">
			<v-list v-if="channelUsers.length">
				<v-list-item
					v-for="channelUser in channelUsers"
					:key="channelUser.id"
					@click="displayProfile(channelUser.login)"
				>
				{{ channelUser.display_name }}
				</v-list-item>
			</v-list>
		<p v-else>~ no one in this channel except you ~</p>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
	},
	props: {
		selectedChannelName: String
	},
	setup(props) {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		const channelUsers = ref([]);
		const fetchUsers = async function() {
			try {
				if (!props.selectedChannelName || props.selectedChannelName === '') {
					/* TODO : display stg ? */
					snackbarStore.showSnackbar('No channel selected', 3000, 'red');
					return;
				}
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${props.selectedChannelName}/access/users`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${JWT.value}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				channelUsers.value = await response.json();
				console.log("[ChannelUsers.vue:fetchUsers] channelUsers: " + JSON.stringify(channelUsers.value));
			} catch (error) {
				console.error(error);
			}
		};
		return {
			JWT,
			user,
			channelUsers,
			fetchUsers,
		};
	},
	mounted() {
		this.fetchUsers();
	},
};

</script>
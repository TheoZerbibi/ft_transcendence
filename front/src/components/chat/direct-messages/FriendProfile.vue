<template>

	<v-card v-if="selectedFriendLogin">

		<v-card-title>Profile of @{{ selectedFriendLogin }}</v-card-title>

		<v-card-text>
			<v-row>
				<v-col cols="12" md="6">
					<v-img
						:src="cadre">
						<v-img
							:src="friendData.avatar">
						</v-img>
					</v-img>
				</v-col>
				<v-col cols="12" md="6">
					<v-card-title>Name: {{ friendData.name }}</v-card-title>
					<v-card-title>Wins: {{ friendData.stats.wins }}</v-card-title>
					<v-card-title>Loses: {{ friendData.stats.loses }}</v-card-title>
					<v-card-title>Matches: {{ friendData.stats.matches }}</v-card-title>
				</v-col>
			</v-row>
		</v-card-text>

		<v-card-actions>
			<v-btn
				class="justify-end"
				@click="blockUser"	
				>Block
			</v-btn>
		</v-card-actions>

	</v-card>

	<v-card v-else>
		<v-card-title>Messages</v-card-title>
		<v-card-text class="empty-card">
			~ no friend selected ~
		</v-card-text>
	</v-card>

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

export default {
	components: {
		Snackbar,
	},
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	props: {
		selectedFriendLogin: String,
	},
	data() {
		return {
			friendLogin: '' as string,
			cadre: '/game/UI/cadres/cadre0.png' as string,
			friendData: {
				name: '' as string,
				avatar: '' as string,
				stats: {
					wins: 0 as number,
					loses: 0 as number,
					matches: 0 as number,
				},
			} as any,
		};
	},
	watch: {
		selectedFriendLogin: function(newVal: string) {
			try {
				this.friendLogin = newVal;
				this.fetchFriendInfos();
			} catch (error) {
				console.log(error);
			}
		},
	},
	methods: {
		fetchFriendInfos: async function() {
			try {
				if (!this.friendLogin || this.friendLogin === '') {
					console.log('[fetchFriendInfos]: friendLogin is empty');
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/profile/${this.friendLogin}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				const data: any = await response.json();
				this.friendData = {
					name: data.display_name,
					avatar: data.avatar,
					member_since: data.created_at,
					stats: {
						wins: data.stats.wins,
						loses: data.stats.loses,
						matches: data.stats.matches,
					},
					cadre: this.cadre,
				};
				console.log(this.friendData);
			} catch (error) {
				console.log(error);
			}
		},
		blockUser: async function() {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/block`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							login: this.friendLogin,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				snackbarStore.showSnackbar(
					`You blocked ${this.friendLogin}`,
					3000,
					'green'
				);
			} catch (error) {
				console.log(error);
			}
		},
	},
};

</script>
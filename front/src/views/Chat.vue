<template>
	<v-layout class="bg-white" fluid>
		<v-app-bar app class="elevation-0 bg-white" density="compact" style="border: black solid thin">
			<v-app-bar-nav-icon flat :ripple="false" rounded="0" icon="fa fa-ellipsis-h" @click.stop="drawer = !drawer" />
			<v-toolbar-title class="text-end md-2 pa-2 h2">Whitespace Community</v-toolbar-title>
		</v-app-bar>

		<v-navigation-drawer 
			rail
			class="elevation-0 bg-white" 
			style="border: black solid thin"
			v-model="drawer"
			clipped
			app>
			<div fill-height class="d-flex flex-column justify-space-between"
			style="height: 100%;">
			<v-tabs nav v-model="tab" direction="vertical" grow>
				<v-tab
					v-for="(link, index) in links"
					:ripple="false"
					:prepend-icon="link.icon"
					:value="link.value"
					:key="link.value"
				>
				</v-tab>
			</v-tabs>
			<v-btn 
				flat 
				rounded="0" 
				:ripple="false"
				@click="redirect('Home')"
				icon="fas fa-home"
				size="small"
				></v-btn>
			</div>
		</v-navigation-drawer>

		<v-navigation-drawer nav
		class="hidden-sm-and-down elevation-0 bg-white"
		>
			<!-- Friend, requests, users lists -->
			<div v-show="tab === 1">
				<Suspense>
					<main>
						<Friends
							@user-selected="updateSelectedUser"
							@ask-refresh="refreshDMsPage"
							:refresh="refreshKeyDMs"
						/>
						<Requests
							@user-selected="updateSelectedUser"
							@ask-refresh="refreshDMsPage"
							:refresh="refreshKeyDMs"
						/>
						<Users
							@user-selected="updateSelectedUser"
							@ask-refresh="refreshDMsPage"
							:refresh="refreshKeyDMs"
						/>
					</main>
					<template #fallback>
						<div>Loading...</div>
					</template>
				</Suspense>
			</div>
			<!-- Joined channels, discover channels -->
			<div v-show="tab === 2">
				<JoinedChannels
					@channel-selected="updateSelectedChannel"
					@ask-refresh="refreshChannelsPage"
					:refresh="refreshKeyChannels"
				/>
				<DiscoverChannels @ask-refresh="refreshChannelsPage" :refresh="refreshKeyChannels" />
			</div>
			<!-- Profile Settings -->
			<div v-show="tab === 3">
				<ProfileSettings  @account-deleted="redirectToLogin"/>
			</div>
		</v-navigation-drawer>

		<v-navigation-drawer location="right" v-if="tab === 1 || tab === 2">
			<div v-show="tab === 1">
				<UserProfile :selectedUserLogin="selectedUserLogin" />
			</div>
			<div v-show="tab === 2">
				<ChannelSettings
					:selectedChannelName="selectedChannelName"
					:refresh="refreshKeyChannels"
				/>
			</div>
		</v-navigation-drawer>

		<v-main>
			<v-window v-model="tab" class="bg-white">
				<!-- Direct messages tab -->
				<div v-show="tab === 1">
					<Suspense>
							<DirectMessages 
							:selectedUserLogin="selectedUserLogin"
							:refresh="refreshKeyDMs"/>
						<template #fallback>
							<div>Loading...</div>
						</template>
					</Suspense>
				</div>

				<!-- Channels tab -->
				<div v-show="tab === 2">
					<ChannelMessages
						:selectedChannelName="selectedChannelName"
						:refresh="refreshKeyChannels"
					/>
				</div>

				<!-- Profile tab -->
				<div v-show="tab === 3">
					<v-card>
						<Suspense>
							<v-card>
								<Profile/>
							</v-card>
							<template #fallback>
								<div>Loading...</div>
							</template>
						</Suspense>
					</v-card>
				</div>
			</v-window>
		</v-main>
	</v-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// Direct messages
import Friends from '../components/chat/direct-messages/Friends.vue';
import Requests from '../components/chat/direct-messages/Requests.vue';
import Users from '../components/chat/direct-messages/Users.vue';
import DirectMessages from '../components/chat/direct-messages/DirectMessages.vue';
import UserProfile from '../components/chat/direct-messages/UserProfile.vue';

// Channels
import DiscoverChannels from '../components/chat/channels/DiscoverChannels.vue';
import JoinedChannels from '../components/chat/channels/JoinedChannels.vue';
import ChannelMessages from '../components/chat/channels/ChannelMessages.vue';
import ChannelSettings from '../components/chat/channels/ChannelSettings.vue';

// Profile
import Profile from '../components/chat/profile/Profile.vue';
import ProfileSettings from '../components/chat/profile/ProfileSettings.vue';
import BlockedUsers from '../components/chat/profile/BlockedUsers.vue';
import MatchHistory from '../components/chat/profile/MatchHistory.vue';

import Box from '../components/layout/Box.vue';
import Button from '../components/layout/Button.vue';

import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { computed } from 'vue';

//socket import
import { useSocketStore } from '../stores/websocket';
import { provide } from 'vue';

export default defineComponent({
	name: 'ChatView',
	components: {
		/* Direct messages */
		Friends,
		Requests,
		Users,
		DirectMessages,
		UserProfile,

		/* Channels */
		DiscoverChannels,
		JoinedChannels,
		ChannelMessages,
		ChannelSettings,

		/* Profile */
		Profile,
		ProfileSettings,
		BlockedUsers,
		MatchHistory,

		/* Layout */
		Box,
		Button,
	},
	setup() {
		let open = false as Boolean;
		const userStore = useUser();
		const webSocketStore = useSocketStore();
		const route = useRoute();
		const tab = ref(route.query.tab ? parseInt(route.query.tab as string) : 1);

		const user = computed(() => userStore.getUser);
		const JWT = computed(() => userStore.getJWT);

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);

		const msg = null;
		const connect = async (JWT: string) => {
			await webSocketStore.connect(JWT, import.meta.env.VITE_CHAT_SOCKET_PORT);
		};

		const disconnect = async () => {
			await webSocketStore.disconnect();
		};

		//	provide('chat-socket', socket);

		const links = [
			{
				name: 'Direct Messages',
				value: 1,
				icon: 'fas fa-user-friends',
			},
			{
				name: 'Channels',
				value: 2,
				icon: 'fas fa-comments',
			},
			{
				name: 'Profile',
				value: 3,
				icon: 'fas fa-user',
			},
		];


		return {
			isConnected,
			connect,
			disconnect,
			socket,
			JWT,
			user,
			tab,
			links,
			open,
		};
	},
	data() {
		return {
			drawer: null as any,
			refreshKeyDMs: 0,
			refreshKeyChannels: 0,
			refreshKeyProfile: 0,
			selectedUserLogin: '' as string,
			selectedChannelName: '' as string,
			links: [
				{
					name: 'Direct Messages',
					value: 1,
					icon: 'fas fa-user-friends',
				},
				{
					name: 'Channels',
					value: 2,
					icon: 'fas fa-comments',
				},
				{
					name: 'Profile',
					value: 3,
					icon: 'fas fa-user',
				},
			],
		};
	},
	async mounted() {
			await this.connect(this.JWT);
			console.log(`[Chat-Websocket] attempt to connect. isConnectecd = ${this.isConnected}`);
			this.socket.on('welcome', (data) => {
				console.log(`[Chat-Websocket] List of connected user: ${data}`); 
			});
	},
	methods: {
		updateSelectedUser(login: string) {
			console.log('[CHAT.vue] NEW SELECTED FRIEND LOGIN: ', this.selectedUserLogin);
			this.selectedUserLogin = login;
		},

		updateSelectedChannel(name: string) {
			console.log('[CHAT.vue] NEW SELECTED CHANNEL NAME: ', this.selectedChannelName);
			this.selectedChannelName = name;
		},
		redirect(path: string) {
			return this.$router.push({ name: path });
		},
		async logout() {
			sessionStorage.clear();
			await this.userStore.deleteUser();
			if (this.isConnected) this.disconnect();
			return this.$router.push({ name: `Login` });
		},
		async redirectToLogin() {
			return this.$router.push({ name: `Login` });
		},
		refreshDMsPage() {
			this.refreshKeyDMs++;
		},
		refreshChannelsPage() {
			this.refreshKeyChannels++;
		},
		openDrawer() {
			if (this.open === true) this.open = false;
			else if (this.open === false) this.open = true;
		},
	},
//	async beforeMount() {
//		if (!this.JWT) {
//			return this.$router.push({ name: `Login` });
//		} else {
//			await this.connect(this.JWT);
//		}
//	},
	async beforeUnmount() {
		if (this.isConnected) {
			this.disconnect();
		}
		if (snackbarStore.snackbar) snackbarStore.hideSnackbar();
}
});
</script>

<style>
.v-dialog {
	width: 30dvw;
	height: 70dvh;
}
</style>

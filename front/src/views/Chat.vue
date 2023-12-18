<template>
	<v-layout fluid class="d-flex flex-column justify-center align-center bg-white" >

		<v-app-bar 
			app
			fluid
			class="elevation-0 bg-white d-flex flow-row justify-center align-center flex-grow-0 flex-shrink-0"
			density="compact"
			style="border: black solid thin">
			<v-toolbar-title class="text-end md-2 pa-2 h2">OMORI Community</v-toolbar-title>
		</v-app-bar>
		
		<v-bottom-navigation 
			fluid 
			expand-on-hover 
			rail 
			app 
			style="border: black solid thin"
			class="d-flex flex-column flex-grow-1 flex-shrink-1 align-center justify-center">
			<v-tabs nav v-model="tab">
				<v-tab
					v-for="(link, index) in links"
					:ripple="false"
					:prepend-icon="link.icon"
					:value="link.value"
					:key="link.value"
					stacked
					>
				</v-tab>
			</v-tabs>
		</v-bottom-navigation>

		<v-main fill-height class="d-flex flex-column justify-start align-center" style="width: 100dvw;">
			<v-container fill-height class="d-flex flex-column justify-center bg-yellow" >
				<v-window v-model="tab" fill-heigh class="d-flex flex-row align-start justify-center flex-shrink-1 bg-black">
					<!-- Direct messages tab -->
					<v-window-item :value="1">
						<!-- Friend, requests, users lists -->
						<v-row>
							<v-col cols="12" md="3">
								<v-card>
									<Friends @user-selected="updateSelectedUser" />
									<Requests @user-selected="updateSelectedUser"/>
									<Users @user-selected="updateSelectedUser"/>
								</v-card>
							</v-col>
							<!-- DMs -->
							<v-col cols="12" md="6">
								<v-card>
									<DirectMessages :selectedUserLogin="selectedUserLogin" />
								</v-card>
							</v-col>
							<!-- Friend profile -->
							<v-col cols="12" md="3">
								<v-card>
									<UserProfile :selectedUserLogin="selectedUserLogin" />
								</v-card>
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Channels tab -->
					<v-window-item :value="2">
						<v-row>
							<!-- Joined channels, discover channels -->
							<v-col cols="12" md="3">
								<v-card>
									<JoinedChannels @channel-selected="updateSelectedChannel" />
									<DiscoverChannels />
								</v-card>
							</v-col>

							<!-- Colonne du milieu pour Messages (3/4 de l'écran) -->
							<v-col cols="12" md="6">
								<v-card>
									<ChannelMessages :selectedChannelName="selectedChannelName"></ChannelMessages>
								</v-card>
							</v-col>

							<v-col cols="12" md="3">
								<v-card>
									<ChannelSettings :selectedChannelName="selectedChannelName"></ChannelSettings>
								</v-card>
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Profile tab -->
					<v-window-item :value="3">
						<v-row>
							<v-col cols="12" md="3">
								<v-card>
									<ProfileSettings />
								</v-card>
							</v-col>
							<v-col cols="12" md="9">
								<v-card>
									<Profile />
									<MatchHistory />
									<BlockedUsers />
								</v-card>
							</v-col>
						</v-row>
					</v-window-item>
				</v-window>
			</v-container>
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
		const userStore = useUser();
		const webSocketStore = useSocketStore();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);

		const msg = null;
		const connect = async (JWT: string) => {
			await webSocketStore.connect(JWT, import.meta.env.VITE_CHAT_SOCKET_PORT);
		};


		const route = useRoute();
		const tab = ref(route.query.tab ? parseInt(route.query.tab as string) : 1);

		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

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
		const routes = [
			{
				name: 'OmoriPong',
				path: 'GameMenu',
				value: 1,
			},
			{
				name: 'OmoriMusic',
				path: 'MusicMenu',
				value: 2,
			},
			{
				name: 'Logout',
				path: 'Login',
				value: 3,
			},
		];

		return {
			isConnected,
			connect,
			socket,
			JWT,
			user,
			tab,
			links,
			routes,
		};
	},
	data() {
		return {
			selectedUserLogin: '' as string,
			selectedChannelName: '' as string,
			links: [
				{
					name: 'Direct Messages',
					value: 1,
				},
				{
					name: 'Channels',
					value: 2,
				},
				{
					name: 'Profile',
					value: 3,
				},
			],
			currentTime: '' as string,
		};
	},
	async mounted() {
		await this.connect(this.JWT, import.meta.env.VITE_CHAT_SOCKET_PORT);
		console.debug(`Connection to socket is actually ${this.isConnected}`);
		this.socket.on('new-direct-message', (data) => {
				console.log('event detected: ' + 'new-direct-message');
				const msg = JSON.parse(data);
				console.log(msg);
				});

		this.socket.on('welcome', (data: any) => {
			console.log('Welcome message received');
			console.log(`retrieved ${data}`);
		});

		this.updateTime();
		setInterval(this.updateTime, 1000);
	},
	methods: {
		updateSelectedUser(login: string) {
			this.selectedUserLogin = login;
			console.log('[CHAT.vue] NEW SELECTED FRIEND LOGIN: ', this.selectedUserLogin);
		},

		updateSelectedChannel(name: string) {
			this.selectedChannelName = name;
			console.log('[CHAT.vue] NEW SELECTED CHANNEL NAME: ', this.selectedChannelName);
		},
		redirect(path: string) {
			return this.$router.push({ name: path });
		},
		async logout() {
			sessionStorage.clear();
			await this.userStore.deleteUser();
			this.disconnect();
			return this.$router.push({ name: `Login` });
		},
		async updateTime() {
			const now = new Date();
			const hours = now.getHours().toString().padStart(2, '0');
			const minutes = now.getMinutes().toString().padStart(2, '0');
			this.currentTime = `${hours}:${minutes}`;
		},
	},
});
</script>

<style>
.active-tab {
	background-color: #e0e0e0 !important;
	color: black !important;
}

.inactive-tab {
	background-color: #757575 !important;
	color: white !important;
}

.no-hover {
	background-color: transparent !important;
	color: inherit !important;
}

.empty-card {
	background-color: #e0e0e0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	flex-shrink: 1;
}

.scrollable-card {
	overflow-y: auto;
}

.v-list {
	max-height: 100%;
	overflow-y: auto;
}

.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 1rem;
	border-radius: 0.5rem;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 100;
}

.close-svg {
	content: url('https://api.iconify.design/mdi/close.svg?color=white');
}

.tabs {
	width: 20dvw;
	border-right: black solid thick;
	border-top: black solid thick;
	border-bottom: black solid thick;
}

.tabs:hover {
	background-color: #e0e0e0 !important;
	color: black !important;
}

.tab-active {
	background-color: #e0e0e0 !important;
	color: black !important;
}

.bg-image {
	background-image: url('/chat/background/Desktop.png');
	background-repeat: no-repeat;
	object-fit: cover;
	max-height: 100dvh;
	max-width: 100dvw;
	aspect-ratio: 1;
}

.time {
	font-size: 14px;
	color: #666;
}
</style>

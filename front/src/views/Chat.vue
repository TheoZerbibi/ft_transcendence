<template>
	<v-layout class="bg-white">

		<v-app-bar class="elevation-0 bg-white" density="compact" style="border: black solid thin">
			<v-toolbar-title class="text-end md-2 pa-2 h2">OMORI Community</v-toolbar-title>
		</v-app-bar>

		<v-navigation-drawer rail class="elevation-0 bg-white" style="border: black solid thin">
			<v-list>

			</v-list>
			<v-tabs nav v-model="tab" direction="vertical" grow>
				<v-tab v-for="(link, index) in links" :ripple="false" :prepend-icon="link.icon" :value="link.value"
					:key="link.value">
				</v-tab>
			</v-tabs>
		</v-navigation-drawer>

		<v-navigation-drawer nav>
			<!-- Friend, requests, users lists -->
			<div v-show="tab === 1">
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
			</div>
			<!-- Joined channels, discover channels -->
			<div v-show="tab === 2">
				<JoinedChannels @channel-selected="updateSelectedChannel" />
				<DiscoverChannels />
			</div>
			<!-- Profile Settings -->
			<div v-show="tab === 3">
				<ProfileSettings />
			</div>
		</v-navigation-drawer>

		<v-navigation-drawer location="right">
			<div v-show="tab === 1">
				<UserProfile :selectedUserLogin="selectedUserLogin" />
			</div>
			<div v-show="tab === 2">
				<ChannelSettings :selectedChannelName="selectedChannelName" />
			</div>
		</v-navigation-drawer>

		<v-main>
			<v-window v-model="tab" class="bg-white">
				<!-- Direct messages tab -->
				<div v-show="tab===1">
					<DirectMessages :selectedUserLogin="selectedUserLogin" />
				</div>

				<!-- Channels tab -->
				<div v-show="tab===2">
					<ChannelMessages :selectedChannelName="selectedChannelName"></ChannelMessages>
				</div>

				<!-- Profile tab -->
				<div v-show="tab===3">
					<v-card>
						<Profile />
						<MatchHistory />
						<BlockedUsers />
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
		const userStore = useUser();
		const route = useRoute();
		const tab = ref(route.query.tab ? parseInt(route.query.tab as string) : 1);
		const webSocketStore = useSocketStore();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);

		const msg = null;
		const connect = async (JWT: string) => {
			await webSocketStore.connect(JWT, import.meta.env.VITE_CHAT_SOCKET_PORT);
		};

		provide('chat-socket', socket);

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

		return {
			isConnected,
			connect,
			socket,
			JWT,
			user,
			tab,
			links,
		};
	},
	data() {
		return {
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
			this.disconnect();
			return this.$router.push({ name: `Login` });
		},
		refreshDMsPage() {
			this.refreshKeyDMs++;
		},
	},
});
</script>

<style>
.v-card {
	border: black solid thin;
	border-radius: 0;
	max-height: 89dvh;
	height: 90dvh;
}
</style>

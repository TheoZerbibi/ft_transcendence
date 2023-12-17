<template>
	<v-layout class="d-flex flex-column justify-space-between align-content-space-evenly bg-image">

		<v-app-bar class="elevation-0 appBarBox bg-black d-flex flow-row justify-center align-center" density="compact">
			<div style="border: white solid medium; height: 5dvh; width: 95dvw">
				<v-toolbar-title class="omoriFont text-start h2">OMORI Community</v-toolbar-title>
			</div>
			<Button icon :height="5" :width="5" :border="'white solid medium'" @click="redirect('Home')">
				<v-icon color="white" class="close-svg"></v-icon>
			</Button>
		</v-app-bar>

		<v-main class="d-flex flex-column justify-start align-center" style="width: 100dvw; height: 85dvh">
			<v-container class="d-flex flex-column justify-center windowBox" style="height: 85dvh">
				<v-row class="bg-black ga-3" style="max-height: 5dvh">
					<v-tabs v-model="tab" flat hide-slider grow class="bg-grey-darken-1">
						<v-tab v-for="(link, index) in links" :key="link.value" :value="link.value" :text="link.name"
							class="no-hover h3 omoriFont justify-start align-center tabs" :ripple="false"
							:style="{ 'border-left': index === 0 ? 'black solid thick' : 'none' }" />
					</v-tabs>
				</v-row>

				<v-window v-model="tab">
					<!-- Direct messages tab -->
					<v-window-item :value="1">
						<!-- Friend, requests, users lists -->
						<v-row>
							<v-col cols="12" md="3">
								<Box>
									<Friends @messages-with="updateMessagesList" />
									<Requests />
									<Users />
								</Box>
							</v-col>
							<!-- DMs -->
							<v-col cols="12" md="6">
								<Box>
									<DirectMessages :selectedFriendLogin="selectedFriendLogin" />
								</Box>
							</v-col>
							<!-- Friend profile -->
							<v-col cols="12" md="3">
								<Box>
									<UserProfile :selectedFriendLogin="selectedFriendLogin" />
								</Box>
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Channels tab -->
					<v-window-item :value="2">
						<v-row>
							<!-- Joined channels, discover channels -->
							<v-col cols="12" md="3">
								<Box>
									<JoinedChannels @channel-selected="updateSelectedChannel" />
									<DiscoverChannels />
								</Box>
							</v-col>

							<!-- Colonne du milieu pour Messages (3/4 de l'écran) -->
							<v-col cols="12" md="6">
								<Box>
									<ChannelMessages :selectedChannelName="selectedChannelName"></ChannelMessages>
								</Box>
							</v-col>

							<v-col cols="12" md="3">
								<Box>
									<ChannelSettings :selectedChannelName="selectedChannelName"></ChannelSettings>
								</Box>
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Profile tab -->
					<v-window-item :value="3">
						<v-row>
							<v-col cols="12" md="3">
								<Box>
									<v-card-title>Settings</v-card-title>
								</Box>
							</v-col>
							<v-col cols="12" md="9">
								<Box>
									<BlockedUsers />
								</Box>
							</v-col>
						</v-row>
					</v-window-item>
				</v-window>
			</v-container>
		</v-main>

		<v-footer app color="grey-lighten-1" style="border-top: #e9e9e9 ridge 0.35rem">
			<v-container >
				<v-row class="d-flex flex-row justify-space-between">
					<v-col cols="9">
						<v-menu :location="location">
							<template v-slot:activator="{ props }">
								<Button :backgroundColor="'#e0e0e0'" :color="'black'" :width="15" :height="5"
									:margin="'0px'" :border="'0.4rem ridge #e9e9e9'" :font="'OMORI_ARCADE'" :fontSize="35"
									v-bind="props">
									Start
								</Button>
							</template>

							<v-list>
								<v-list-item v-for="(route, index) in routes" :key="route.value" :value="route.value"
									:text="route.name">
									<v-list-item-title @click="redirect(route.path)">{{ route.name }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
					<v-spacer></v-spacer>
					<v-col>
						<div class="d-flex text-end">
							<Button disabled :backgroundColor="'#e9e9e9'" :color="'black'" :width="12" :height="5" :margin="'0px'"
								:border="'0.3rem ridge #e9e9e9'" :font="'OMORI_ARCADE'" :fontSize="30">
								{{ currentTime }}
							</Button>
						</div>
					</v-col>
				</v-row>
			</v-container>

		</v-footer>
	</v-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

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
import BlockedUsers from '../components/chat/profile/BlockedUsers.vue';

import Box from '../components/layout/Box.vue';
import Button from '../components/layout/Button.vue';

import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { useSocketStore } from '../stores/websocket';
import { computed } from 'vue';

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
		BlockedUsers,

		/* Layout */
		Box,
		Button,
	},
	setup() {
		const userStore = useUser();
		const tab = ref(0);

		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		const links = [
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
			},];
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
			}
		]

		return {
			JWT,
			user,
			tab,
		};

	},
	data() {
		return {
			selectedFriendLogin: '' as string,
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
	mounted() {
		this.updateTime();
		setInterval(this.updateTime, 1000);
	},
	methods: {
		updateMessagesList(login: string) {
			this.selectedFriendLogin = login;
			console.log('[CHANNELS.vue] NEW SELECTED FRIEND LOGIN: ', this.selectedFriendLogin);
		},

		updateSelectedChannel(name: string) {
			this.selectedChannelName = name;
			console.log('[CHANNELS.vue] NEW SELECTED CHANNEL NAME: ', this.selectedChannelName);
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
<template>
	<v-layout class="d-flex flex-column align-center justify-center">

		<v-app-bar class="d-flex flex-column justify-center align-center elevation-0 windowBox" density="compact">
			<v-toolbar-title class="omoriFont white-text text-start h1 ">OMORI Community</v-toolbar-title>
		</v-app-bar>

		<v-container fill-height class="d-flex flex-column justify-center align-center windowBox" style="width: 100dvh">
			<v-tabs v-model="tab" flat hide-slider grow height="60px" style="border: black solid thick"
				class="bg-grey-darken-1 ">
				<v-tab v-for="(link, index) in links" :key="link.value" :value="link.value" :text="link.name"
					class="no-hover h2 omoriFont justify-start align-start" selected-class="active-tab" :ripple="false"
					:style="{ 'border-right': index !== links.length - 1 ? 'black solid thick' : 'none', width: index !== links.length - 1 ? '20dvw' : 'auto' }" />
			</v-tabs>

			<v-main>
				<!-- Main content -->
				<v-row>
					<v-col>
						<v-window v-model="tab">

							<!-- Direct messages tab -->
							<v-window-item :value="1">
								<!-- Friend, requests, users lists -->

								<Box>
									<Friends @messages-with="updateMessagesList" />
									<Requests />
									<Users />
								</Box>
								<!-- DMs -->
								<Box>
									<DirectMessages :selectedFriendLogin="selectedFriendLogin" />
								</Box>
								<!-- Friend profile -->
								<Box>
									<UserProfile :selectedFriendLogin="selectedFriendLogin" />
								</Box>

							</v-window-item>

							<!-- Channels tab -->
							<v-window-item :value="2">
								<v-row>
									<!-- Joined channels, discover channels -->
									<v-col cols="12" md="3">
										<JoinedChannels @channel-selected="updateSelectedChannel" />
										<DiscoverChannels />
									</v-col>

									<!-- Colonne du milieu pour Messages (3/4 de l'écran) -->
									<v-col cols="12" md="6">
										<ChannelMessages :selectedChannelName="selectedChannelName"></ChannelMessages>
									</v-col>

									<v-col cols="12" md="3">
										<ChannelUsers :selectedChannelName="selectedChannelName"></ChannelUsers>
										<ChannelSettings :selectedChannelName="selectedChannelName"></ChannelSettings>

									</v-col>
								</v-row>
							</v-window-item>

							<!-- Profile tab -->
							<v-window-item :value="3">
								<v-row>
									<v-col xs-12 sm-6 md-3>
										<BlockedUsers />
									</v-col>
								</v-row>
							</v-window-item>
						</v-window>
					</v-col>
				</v-row>
			</v-main>
		</v-container>

		<v-footer app color="grey-lighten-1" class="d-flex flex-column align-start">
			<Button>Start</Button>
		</v-footer>
	</v-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import Friends from '../components/chat/direct-messages/Friends.vue';
import Requests from '../components/chat/direct-messages/Requests.vue';
import Users from '../components/chat/direct-messages/Users.vue';
import DirectMessages from '../components/chat/direct-messages/DirectMessages.vue';
import UserProfile from '../components/chat/direct-messages/UserProfile.vue';

import DiscoverChannels from '../components/chat/channels/DiscoverChannels.vue';
import JoinedChannels from '../components/chat/channels/JoinedChannels.vue';
import ChannelMessages from '../components/chat/channels/ChannelMessages.vue';
import ChannelUsers from '../components/chat/channels/ChannelUsers.vue';
import ChannelSettings from '../components/chat/channels/ChannelSettings.vue';
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
		ChannelUsers,
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
			},]

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
		}
	},
	methods: {
		updateMessagesList(login: string) {
			this.selectedFriendLogin = login;
		},

		updateSelectedChannel(selectedChannelName: string) {
			this.selectedChannelName = selectedChannelName;
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
</style>
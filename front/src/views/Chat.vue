<template>
	<v-container
		fluid
		>

		<!-- Top bar : tabs -->
		<v-row>
			<v-col>
				<v-tabs v-model="tab">
					<v-spacer></v-spacer>
					<v-tab :value="1">Direct Messages</v-tab>
					<v-spacer></v-spacer>
					<v-tab :value="2">Channels</v-tab>
					<v-spacer></v-spacer>
					<v-tab :value="3">Profile</v-tab>
					<v-spacer></v-spacer>
				</v-tabs>
			</v-col>
		</v-row>

		<!-- Main content -->
		<v-row>
			<v-col class="custom-column">
				<v-window v-model="tab">

					<!-- Direct messages tab -->
					<v-window-item :value="1">
						<v-row>
							<!-- Friend, requests, users lists -->
							<v-col class="custom-column" cols="12" md="3">
								<AddFriends @messages-with="fetchDirectMessages"/>
							</v-col>

							<!-- DMs -->
							<v-col class="custom-column" cols="12" md="9">
								<DirectMessages :messages="directMessages"></DirectMessages>
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Channels tab -->
					<v-window-item :value="2">
						<v-row>
							<!-- Joined channels, discover channels -->
							<v-col class="custom-column" cols="12" md="3">
								<JoinedChannels @channel-selected="updateSelectedChannel"/>
								<DiscoverChannels/>
							</v-col>

							<!-- Colonne du milieu pour Messages (3/4 de l'écran) -->
							<v-col class="custom-column" cols="12" md="6">
								<ChannelMessages :selectedChannelName="selectedChannelName"></ChannelMessages>
							</v-col>

							<v-col class="custom-column" cols="12" md="3">
								<ChannelUsers :selectedChannelName="selectedChannelName"></ChannelUsers>
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Profile tab -->
					<v-window-item :value="3">
						<v-row>
							<v-col class="custom-column" cols="12">
								<BlockedUsers/>
							</v-col>
						</v-row>
					</v-window-item>

				</v-window>

			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import AddFriends from '../components/chat/direct-messages/Friends.vue';
import Friends from '../components/chat/direct-messages/Friends.vue';
import DirectMessages from '../components/chat/direct-messages/DirectMessages.vue';

import DiscoverChannels from '../components/chat/channels/DiscoverChannels.vue';
import JoinedChannels from '../components/chat/channels/JoinedChannels.vue';
import ChannelMessages from '../components/chat/channels/ChannelMessages.vue';
import ChannelUsers from '../components/chat/channels/ChannelUsers.vue';

import BlockedUsers from '../components/chat/profile/BlockedUsers.vue';

import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { useSocketStore } from '../stores/websocket';
import { computed } from 'vue';

export default defineComponent({

	name: 'ChatView',

	components: {
		AddFriends,
		Friends,
		DirectMessages,
		DiscoverChannels,
		JoinedChannels,
		ChannelMessages,
		ChannelUsers,
		BlockedUsers,
	},
	props: {
		message: Object,
	},
	setup() {

//				const webSocketStore = useSocketStore();
				const userStore = useUser();
				const snackbarStore = useSnackbarStore();

//				let connectedUsers: any = [];
				const tab = ref(0); // Start with the first tab active
			
//				const isConnected = computed(() => webSocketStore.isConnected);
//				const socket = computed(() => webSocketStore.getSocket);
				const JWT = computed(() => userStore.getJWT);
				const user = computed(() => userStore.getUser);
			
//				const connect = async (JWT: string) => {
//					await webSocketStore.connect(JWT, import.meta.env.VITE_CHAT_SOCKET_PORT);
//				};
//			
//				const disconnect = () => {
//					webSocketStore.disconnect();
//				};
//
//				const socketListen = () => {
//					if (socket.value) {
//						socket.value.on('chat-error', (data: any) => { disconnect(); snackbarStore.showSnackbar(data, 3000, 'red'); });
//					//	socket.value.on('welcome', (data: any) => { connectedUsers = JSON.parse(data) });
//					//	socket.value.on('new-direct-message', (data: any) => { connectedUsers = JSON.parse(data) });
//					//	socket.value.on('channel-updated', (data: any) => { connectedUsers = JSON.parse(data) });
//					//	socket.value.on('channel-user-update', (data: any) => { connectedUsers = JSON.parse(data) });
//					//	socket.value.on('channel-creation', (data: any) => { connectedUsers = JSON.parse(data) });
//					//	socket.value.on('channel-joined', (data: any) => { connectedUsers = JSON.parse(data) });
//					//	socket.value.on('user-quitted-channel', (data: any) => { connectedUsers = JSON.parse(data) });
//					//	socket.value.on('channel-deleted', (data: any) => { connectedUsers = JSON.parse(data) });
//						}
//				};
//
//				onMounted(() => {
//						connect(JWT.value);
//						console.log(isConnected.value);
//						console.log('HELLO WORLD !');
//						});
//
				return {
//					isConnected,
//						socket,
//						connect,
//						disconnect,
//						socketListen,
						JWT,
						user,
//						connectedUsers,
						tab,
				};

	},
	data() {
		return {
			directMessages: null as any,
			selectedChannelName: '' as string,
		}
	},
	watch: {
		tab(newVal) {
			if (newVal === 1) {
				//this.fetchDirectMessages(friends[0].login);
			}
		},
	},
	methods: {
		fetchDirectMessages: async function(login: string) {
			try {
				if (!login || login === '') {
					/* TODO : display stg ? */
					return;
				}
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/${login}/all`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				).catch((error: any) => {
					this.snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				const data = await response.json();
				this.directMessages = data;
			} catch (error) {
				console.error(error);
			}
		},

		sendDirectMessage: async function(login: string, input: string) {
			try {
				if (this.input.trim() === '') {
					return;
				}
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/send`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							target_login: login,
							content: input,
						}),
					}
				).catch((error: any) => {
					this.snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.fetchDirectMessages(login);
			} catch (error) {
				console.error(error);
			}
		},

		updateSelectedChannel(selectedChannelName: string) {
			this.isSelectedChannel = true;
			this.selectedChannelName = selectedChannelName;
		},


	},
});

</script>

<style>
.v-container {
/*     background: url('/chat/background/space-parallax.png') no-repeat center center fixed;  */
    background: url('/game/battleParallax/cloud-parallax.png') no-repeat center center fixed; 
	-webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}

.v-tab {
	font-family: 'OMORI_MAIN', sans-serif;
	font-size: xx-large;
	text-align: center;
	color: rgb(65, 37, 37);
	text-shadow:
		1px 1px 2px plum,
		0 0 1em rgb(255, 123, 255),
		0 0 0.2em rgb(255, 255, 255);
}
.custom-column {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	flex-shrink: 1;
}

.custom-column > * {
	flex: 1;
	margin-bottom: 10px;
}

.v-row, .v-col {
	display: flex;
}

.v-card {
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-grow: 1;
	flex-shrink: 1;;
	border-radius: 30px;
}

.v-card-title {
	font-family: 'OMORI_MAIN', sans-serif;
	background-color: rgba(0, 0, 0, 0);
	color: white;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}

.v-card-text {
	font-family: 'OMORI_MAIN', sans-serif;
	background-color: rgba(0, 0, 0, 0);
	color: white;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}

.v-list {
	font-family: 'OMORI_MAIN', sans-serif;
	background-color: rgba(0, 0, 0, 0);
	color: #dddfe2;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
	max-height: 100%;
	overflow-y: auto;
}

.v-text-field {
	font-family: 'OMORI_MAIN', sans-serif;
	background-color: rgba(0, 0, 0, 0);
	color: #dddfe2;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}

.v-btn {
	font-family: 'OMORI_MAIN', sans-serif;
	background-color: rgba(0, 0, 0, 0);
	color: #dddfe2;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}

.justify-end {
    justify-content: flex-end;
}

.justify-start {
    justify-content: flex-start;
}

</style>
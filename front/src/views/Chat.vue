<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<v-tabs v-model="tab" background-color="transparent" dark>
					<v-tab :value="1">Direct Messages</v-tab>
					<v-tab :value="2">Channels</v-tab>
					<v-tab :value="3">Profile</v-tab>
				</v-tabs>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-window v-model="tab">

					<!-- Direct Messages Components -->
					<v-window-item :value="1">
						<v-row>
							<!-- Colonne de gauche pour Friends et AddFriends (1/4 de l'écran) -->
							<v-col cols="12" md="3">
								<Friends @friend-selected="updateSelectedFriend"/>
								<AddFriends/>
							</v-col>

							<!-- Colonne de droite pour DirectMessages (3/4 de l'écran) -->
							<v-col cols="12" md="9">
								<DirectMessages v-if="isSelectedFriend" :selectedFriendLogin="selectedFriendLogin"></DirectMessages>
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Channels Components -->
					<v-window-item :value="2">
						<v-row>
							<!-- Colonne de gauche pour JoinedChannels et Discover (1/4 de l'écran) -->
							<v-col cols="12" md="3">
								<JoinedChannels @channel-selected="updateSelectedChannel"/>
								<DiscoverChannels/>
							</v-col>

							<!-- Colonne du milieu pour Messages (3/4 de l'écran) -->
							<v-col cols="12" md="6">
								<ChannelMessages v-if="isSelectedChannel" :selectedChannelName="selectedChannelName"></ChannelMessages>
							</v-col>

							<v-col cols="12" md="3">
								<ChannelUsers v-if="isSelectedChannel" :selectedChannelName="selectedChannelName"></ChannelUsers>
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Profile Components -->
					<v-window-item :value="3">
						<v-row>
							<v-col cols="12">
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
import { defineComponent, ref } from 'vue';

import AddFriends from '../components/chat/direct-messages/AddFriends.vue';
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
		ChatWindow,
		UsersList,
		FriendsList,
		FriendRequests,
		BlockedList
	},

	setup() {

				const webSocketStore = useSocketStore();
				const userStore = useUser();

				let connectedUsers = [];
				const tab = ref(0); // Start with the first tab active
			
				const isConnected = computed(() => webSocketStore.isConnected);
				const socket = computed(() => webSocketStore.getSocket);
				const JWT = computed(() => userStore.getJWT);
			
				const connect = async (JWT: string) => {
					await webSocketStore.connect(JWT, import.meta.env.VITE_CHAT_SOCKET_PORT);
				};
			
				const disconnect = () => {
					webSocketStore.disconnect();
				};
			
				const socketListen = () => {
					if (socket.value) {
						socket.value.on('chat-error', (data: any) => {
								disconnect();
								snackbarStore.showSnackbar(data, 3000, 'red');
								});
					}

				};

				onMounted(() => {
						connect(JWT.value);
						console.log(isConnected.value);
						console.log('HELLO WORLD !');
						});

				return {
					isConnected,
						socket,
						connect,
						disconnect,
						socketListen,
						JWT,
						connectedUsers,
						tab,
				};

	},
	data() {
		return {
			isSelectedFriend: false,
			selectedFriendLogin: '',
			isSelectedChannel: false,
			selectedChannelName: '',
		}
	},
	beforeMount() {

	},
	mounted() {
	},
	methods: {
		updateSelectedFriend(selectedFriendLogin: string) {
			this.isSelectedFriend = true;
			this.selectedFriendLogin = selectedFriendLogin;
		},
		updateSelectedChannel(selectedChannelName: string) {
			this.isSelectedChannel = true;
			this.selectedChannelName = selectedChannelName;
		}
	}

});
</script>


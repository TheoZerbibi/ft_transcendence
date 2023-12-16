<template>
	<v-container
		fluid
		fill-height
        class="d-flex flex-column"
		>

		<!-- Top bar : tabs -->
		<v-row fill-height>
			<v-col fill-height class="custom-column">
				<v-tabs v-model="tab">
					<v-spacer></v-spacer>
					<v-tab :value="1">DMs</v-tab>
					<v-spacer></v-spacer>
					<v-tab :value="2">Channels</v-tab>
					<v-spacer></v-spacer>
					<v-tab :value="3">Personal</v-tab>
					<v-spacer></v-spacer>
				</v-tabs>
			</v-col>
		</v-row>

		<!-- Main content -->
		<v-row fill-height>
			<v-col fill-height class="custom-column">
				<v-window v-model="tab">

					<!-- Direct messages tab -->
					<v-window-item :value="1">
							<!-- Friend, requests, users lists -->
						<v-row fill-height>
							<v-col fill-height
								class="custom-column"
								cols="12"
								md="3">
								<Friends @messages-with="updateMessagesList" />
								<Requests/>
								<Users/>
							</v-col>
							<!-- DMs -->
							<v-col fill-height
								class="custom-column"
								cols="12"
								md="6">
								<DirectMessages :selectedFriendLogin="selectedFriendLogin" />
							</v-col>
							<!-- Friend profile -->
							<v-col fill-height
								class="custom-column"
								cols="12"
								md="3">
								<UserProfile :selectedFriendLogin="selectedFriendLogin" />
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Channels tab -->
					<v-window-item :value="2">
						<v-row fill-height>
							<!-- Joined channels, discover channels -->
							<v-col fill-height
								class="custom-column"
								cols="12"
								md="3">
								<JoinedChannels @channel-selected="updateSelectedChannel"/>
								<DiscoverChannels/>
							</v-col>

							<!-- Colonne du milieu pour Messages (3/4 de l'écran) -->
							<v-col fill-height
								class="custom-column"
								cols="12"
								md="6">
								<ChannelMessages :selectedChannelName="selectedChannelName"></ChannelMessages>
							</v-col>

							<v-col fill-height
								class="custom-column"
								cols="12"
								md="3">
								<ChannelUsers :selectedChannelName="selectedChannelName"></ChannelUsers>
								<ChannelSettings :selectedChannelName="selectedChannelName"></ChannelSettings>

							</v-col>
						</v-row>
					</v-window-item>

					<!-- Profile tab -->
					<v-window-item :value="3">
						<v-row fill-height>
							<v-col fill-height
								class="custom-column"
								cols="12"
								md="3">
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
	},
	setup() {
		const userStore = useUser();
		const tab = ref(2);
	
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
	
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

.empty-card {
	font-family: 'OMORI_MAIN', sans-serif;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	flex-shrink: 1;;
	border-radius: 30px;
}

.scrollable-card {
	overflow-y: auto;
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

.justify-center {
	justify-content: center;
}

.justify-end {
    justify-content: flex-end;
}

.justify-start {
    justify-content: flex-start;
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
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
	setup() {
		const tab = ref(0); // Start with the first tab active
		return {
			tab
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

<style scoped>
</style>

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

							<!-- Colonne de droite pour MessagesBox (3/4 de l'écran) -->
							<v-col cols="12" md="9">
								<MessagesBox :selectedFriendLogin="selectedFriendLogin"></MessagesBox>
							</v-col>
						</v-row>
					</v-window-item>

					<!-- Channels Components -->
					<v-window-item :value="2">
						<v-row>
							<v-col cols="12">
								<JoinedChannels/>
								<DiscoverChannels/>
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
import MessagesBox from '../components/chat/direct-messages/Messages.vue';

import BlockedUsers from '../components/chat/profile/BlockedUsers.vue';
import DiscoverChannels from '../components/chat/channels/DiscoverChannels.vue';
import JoinedChannels from '../components/chat/channels/JoinedChannels.vue';


export default defineComponent({
	name: 'ChatView',

	components: {
		AddFriends,
		Friends,
		MessagesBox,
		BlockedUsers,
		DiscoverChannels,
		JoinedChannels
	},
	setup() {
		const tab = ref(0); // Start with the first tab active
		return {
			tab
		};
	},
	data() {
		return {
			selectedFriendLogin: '',
		}
	},
	beforeMount() {

	},
	mounted() {
	},
	methods: {
		updateSelectedFriend(selectedFriendLogin: string) {
			this.selectedFriendLogin = selectedFriendLogin;
			console.log("[Chat.vue:updateSelectedFriend] selectedFriendLogin: " + this.selectedFriendLogin);
		},
	}
});
</script>

<style scoped>
</style>

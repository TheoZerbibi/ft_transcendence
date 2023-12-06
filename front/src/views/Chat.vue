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
							<v-col cols="12">
								<Friends/>
								<AddFriends/>
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
import BlockedUsers from '../components/chat/profile/BlockedUsers.vue';
import DiscoverChannels from '../components/chat/channels/DiscoverChannels.vue';
import JoinedChannels from '../components/chat/channels/JoinedChannels.vue';


export default defineComponent({
	name: 'ChatView',

	components: {
		AddFriends,
		Friends,
		BlockedUsers,
		DiscoverChannels,
		JoinedChannels
	},

	setup() {
		const tab = ref(0); // Start with the first tab active
		return {
			tab
		};
	}
});
</script>

<style scoped>
	.v-tab {
		color: white; /* Or any other color you need */
	}
	.v-tab-item {
		background-color: #121212; /* Match this with your theme */
	}
</style>

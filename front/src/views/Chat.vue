<template>
	<v-container fluid>
		<!-- Users and friends -->
		<v-row>
			<v-col cols="3">
				<AddFriends/>
			</v-col>
			<v-col cols="3">
				<Friends/>
			</v-col>
			<v-col cols="3">
				<Blocked/>
			</v-col>
			<!-- Vous pouvez ajouter plus de composants ici avec <v-col> si nécessaire -->
		</v-row>

		<!-- Channels -->
		<v-row>
			<v-col cols="3">
				<DiscoverChannels/>
			</v-col>
			<v-col cols="3">
				<JoinedChannels/>
			</v-col>
		</v-row>
	</v-container>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

// Components
import AddFriends from '../components/chat/direct-messages/AddFriends.vue';
import Friends from '../components/chat/direct-messages/Friends.vue';
import Blocked from '../components/chat/profile/BlockedUsers.vue';
import DiscoverChannels from '../components/chat/channels/Channels.vue';
import JoinedChannels from '../components/chat/channels/JoinedChannels.vue';

export default defineComponent({
	name: 'ChatView',

	components: {
		AddFriends,
		Friends,
		Blocked,
		DiscoverChannels,
		JoinedChannels
	},
	setup() {
		const tab = ('users-friends');
		return {
			tab,
		};
	},
});
</script>

<style scoped>
.user-friends-panel, .channels-panel {
	display: flex;
	flex-direction: column;
}

</style>

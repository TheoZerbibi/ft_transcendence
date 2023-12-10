<template>
	<v-container fluid>
		<!-- Users and friends -->
		<v-row>
			<v-col cols="3">
				<ListUsers/>
			</v-col>
			<v-col cols="3">
				<ListFriends/>
			</v-col>
			<v-col cols="3">
				<ListFriendRequests/>
			</v-col>
			<v-col cols="3">
				<ListBlocked/>
			</v-col>
			<!-- Vous pouvez ajouter plus de composants ici avec <v-col> si nécessaire -->
		</v-row>

		<!-- Channels -->
		<v-row>
			<v-col cols="3">
				<DiscoverChannels/>
			</v-col>
			<v-col cols="3">
				<ListJoinedChannels/>
			</v-col>
		</v-row>
	</v-container>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

// Components
import ListUsers from '../components/chat/DiscoverUsers.vue';
import ListFriends from '../components/chat/ListFriends.vue';
import ListFriendRequests from '../components/chat/ListFriendRequests.vue';
import ListBlocked from '../components/chat/ListBlocked.vue';
import DiscoverChannels from '../components/chat/DiscoverChannels.vue';
import ListJoinedChannels from '../components/chat/ListJoinedChannels.vue';

export default defineComponent({
	name: 'ChatView',

	components: {
		ListUsers,
		ListFriends,
		ListFriendRequests,
		ListBlocked,
		DiscoverChannels,
		ListJoinedChannels
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

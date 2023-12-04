<template>
	<div class="chat-view">
		<ChatWindow/>
		<div class="side-panel">
			<ListUsers/>
			<ListBlocked/>
			<ListFriends/>
			<ListFriendRequests/>
			<DiscoverChannels/>
			<ListJoinedChannels/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import ChatWindow from '../components/chat/ChatWindow.vue';
import ListUsers from '../components/chat/ListUsers.vue';
import ListFriends from '../components/chat/ListFriends.vue';
import ListFriendRequests from '../components/chat/ListFriendRequests.vue';
import ListBlocked from '../components/chat/ListBlocked.vue';
import DiscoverChannels from '../components/chat/DiscoverChannels.vue';
import ListJoinedChannels from '../components/chat/ListJoinedChannels.vue';

export default defineComponent({
	name: 'ChatView',

	components: { ChatWindow, ListUsers, ListFriends, ListFriendRequests, ListBlocked, DiscoverChannels, ListJoinedChannels },
});
</script>

<style scoped>
.side-panel {
	display: flex;
	flex-direction: column;
}
</style>

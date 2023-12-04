<template>
	<div class="chat-view">
		<ChatWindow/>
		<div class="side-panel">
			<UsersList/>
			<FriendsList/>
			<FriendRequests/>
			<BlockedList/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import ChatWindow from '../components/chat/ChatWindow.vue';
import UsersList from '../components/chat/ListUsers.vue';
import FriendsList from '../components/chat/ListFriends.vue';
import FriendRequests from '../components/chat/ListFriendRequests.vue';
import BlockedList from '../components/chat/ListBlocked.vue';

export default defineComponent({
	name: 'ChatView',

	components: { ChatWindow, UsersList, FriendsList, FriendRequests, BlockedList },
});
</script>

<style scoped>
.side-panel {
	display: flex;
	flex-direction: column;
}
</style>

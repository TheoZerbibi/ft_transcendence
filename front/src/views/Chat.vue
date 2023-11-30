<template>
	<div class="chat-view">
		<ChatWindow/>
		<div class="side-panel">
			<FriendRequests/>
			<BlockedList/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import ChatWindow from '../components/chat/ChatWindow.vue';
import FriendRequests from '../components/chat/FriendRequests.vue';
import BlockedList from '../components/chat/BlockedList.vue';

export default defineComponent({
	name: 'ChatView',

	components: { ChatWindow, FriendRequests, BlockedList },
});
</script>

<style scoped>
.side-panel {
	display: flex;
	flex-direction: column;
}
</style>

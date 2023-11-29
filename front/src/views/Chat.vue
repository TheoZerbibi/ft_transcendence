<template>
	<div class="chat-view">
		<FriendList/>
		<ChatWindow/>
	</div>		
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import ChatWindow from '../components/chat/ChatWindow.vue';
import FriendList from '../components/chat/FriendList.vue';

export default defineComponent({
	name: 'ChatView',

	components: { ChatWindow, FriendList },
});
</script>


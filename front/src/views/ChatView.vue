<template>
	<v-app id="inspire">
		<Chat></Chat>
	</v-app>
</template>

<script>
import Chat from '../components/chat/Chat.vue';

export default {
	name: 'ChatView',
	components: { Chat },
};
</script>
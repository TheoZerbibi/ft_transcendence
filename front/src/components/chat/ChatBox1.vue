<template>
<div>
<!-- Your other content -->

<button @click="toggleChat">Toggle Chat</button>

<chat-box v-if="isChatOpen"></chat-box>
</div>
</template>

<script>
import ChatBox from './ChatBox.vue';

export default {
components: {
		    'chat-box': ChatBox,
	    },
		    data() {
			    return {
isChatOpen: false, // Initially, the chat box is closed
			    };
		    },
methods: {
		 toggleChat() {
			 this.isChatOpen = !this.isChatOpen;
		 },
	 },
};
</script>

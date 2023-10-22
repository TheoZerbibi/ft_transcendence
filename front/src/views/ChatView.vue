<template>
<div>
<h1>Chat App</h1>

<v-expansion-panels>
<v-expansion-panel>
<v-expansion-panel-header>Chat</v-expansion-panel-header>
<v-expansion-panel-content>
<chat-box></chat-box>
</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>

</div>
</template>

<script>
import Chat from '../components/chat/Chat.vue'; // Adjust the path as needed
import ChatBox from '../components/chat/ChatBox.vue'; // Adjust the path as needed

export default {
components: {
		    Chat,
		    'chat-box': ChatBox,
	    },
};

</script>

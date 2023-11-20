<template>
<<<<<<< HEAD
	<Discord></Discord>
	<!--
	<v-expansion-panels>
	<v-expansion-panel>
	<v-expansion-panel-header>Chat</v-expansion-panel-header>
	<v-expansion-panel-content>

	</v-expansion-panel-content>
	</v-expansion-panel>
	</v-expansion-panels>
--></template>

<script>
import Chat from '../components/chat/Chat.vue'; // Adjust the path as needed
import Discord from '../components/chat/Discord.vue'; // Adjust the path as needed
import ChatBox from '../components/chat/ChatBox.vue'; // Adjust the path as needed
import ChatBox1 from '../components/chat/ChatBox1.vue';

export default {
	components: {
		Chat,
		'chat-box': ChatBox,
		ChatBox1,
		Discord,
	},
=======
<div>
<h1>Chat App</h1>
<v-box>
<Chat />
</v-box>
</div>
</template>

<script>
import Chat from '../components/Chat.vue'; // Adjust the path as needed

export default {
components: {
		    Chat,
	    },
>>>>>>> 4e9a74d (fix: Fix for rebase)
};
</script>

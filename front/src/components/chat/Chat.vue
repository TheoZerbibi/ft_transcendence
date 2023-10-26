<!--
//	<template>
//	  <div>
//	    <!~~ Chat display area ~~>
//	    <div class="chat-box">
//	      <div v-for="message in messages" :key="message.id" class="message">
//		{{ message.text }}
//	      </div>
//	    </div>
//	
//	    <!~~ Input area ~~>
//	    <v-text-field v-model="newMessage" @keydown.enter="sendMessage" label="Type your message"></v-text-field>
//	  </div>
//	</template>
//	
-->

<template>
	<div>
		<v-navigation-drawer v-model="drawer">
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<!--  -->
		</v-navigation-drawer>

		<!-- Button to open the chat -->
		<v-btn @click="showChat = !showChat">Open Chat</v-btn>

		<!-- Navigation drawer with channel and user alike -->
		<!-- list active conversation -->
		<!-- Individual menu on conversation to access to invitation page and mod page-->
		<!-- on-click to change main to conversation with user or channel -->

		<!-- right drawer to display online/offline user in conversation -->
		<!-- on-click on users to access to profil, invite on game, send privmsg \
		Maybe mod if you are channel owner or mod -->

		<!-- Optionnal but would be great-->
		<!-- Component Chatbox popping from bottom screen for non chat page-->

		<!-- Component for invitation page : probably a v-dialog box-->
		<!-- Component for mod page: probably a v-dialog box -->

		<!-- 


    <v-app-bar>

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>
-->

		<!-- Chat dialog (pops up from the bottom) -->
		<!--
  <v-dialog v-model="showChat"  max-width="600">
    <v-card>
      <v-card-title>Chat</v-card-title>
      <v-card-text>
        <div class="chat-box">
          <div v-for="message in messages" :key="message.id" class="message">
            {{ message.text }}
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-text-field v-model="newMessage" @keydown.enter="sendMessage" label="Type your message"></v-text-field>
      </v-card-actions>

      </v-card>

    </v-dialog>
-->
	</div>
	<v-main> hello world ! </v-main>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(null);
</script>

<script>
export default {
	data() {
		() => ({ drawer: null });
		return {
			messages: [],
			newMessage: '',
			showChat: false, // Controls whether the chat dialog is open or closed
		};
	},
	methods: {
		sendMessage() {
			if (this.newMessage) {
				this.messages.push({ text: this.newMessage, id: this.messages.length + 1 });
				this.newMessage = '';
			}
		},
	},
};
</script>

// export default { // data() { // return { // messages: [], // An array to store chat messages // newMessage: '', //
Input for the new message // }; // }, // methods: { // sendMessage() { // if (this.newMessage) { // this.messages.push({
text: this.newMessage, id: this.messages.length + 1 }); // this.newMessage = ''; // } // }, // }, // };

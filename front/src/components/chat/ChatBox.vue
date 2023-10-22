<template>
  <div>
    <!-- Chat display area -->
    <div class="chat-box">
      <div v-for="message in messages" :key="message.id" class="message">
        {{ message.text }}
      </div>
    </div>

    <!-- Input area -->
    <v-text-field v-model="newMessage" @keydown.enter="sendMessage" label="Type your message"></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [], // An array to store chat messages
      newMessage: '', // Input for the new message
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

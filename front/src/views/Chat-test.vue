<template>
  <div>
    <button @click="openOverlay">Create Channel</button>
    <div v-if="isOverlayOpen">
      <form @submit.prevent="createChannel">
        <label for="channelName">Channel Name:</label>
        <input v-model="channelName" id="channelName" type="text" required />
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">

import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { useSocketStore } from '../stores/websocket';
import { computed } from 'vue';
import { ref } from 'vue';
import { ChannelCreationOverlay } from '../components/chat/ChannelCreationOverlay'

export default {
  components: {
    ChannelOverlay,
  },
  setup() {
    const isOverlayOpen = ref(false);

    const openOverlay = () => {
      isOverlayOpen.value = true;
    };

    const closeOverlay = () => {
      isOverlayOpen.value = false;
    };

    const createChannel = ({ channelName, password }) => {
      // Logic to create a channel with the entered name and password
      // (You can emit an event to your backend here)
      console.log('Creating channel:', { channelName, password });
    };

    return {
      isOverlayOpen,
      openOverlay,
      closeOverlay,
      createChannel,
    };
  },
};
</script>

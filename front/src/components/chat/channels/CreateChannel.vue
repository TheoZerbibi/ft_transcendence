<!-- ChannelCreation.vue -->
<template>
  <v-overlay :value="overlayVisible" @click="closeOverlay">
    <v-card>
      <v-card-title>Create a Channel</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="createChannel">
          <v-text-field v-model="channelName" label="Channel Name" required></v-text-field>
          <v-text-field v-model="channelPassword" label="Channel Password" type="password"></v-text-field>
          <v-checkbox v-model="isPublic" label="Public Channel"></v-checkbox>

          <v-btn type="submit" color="primary">Create Channel</v-btn>
          <v-btn @click="closeOverlay">Cancel</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ChannelCreation',
  props: {
    // You can pass any necessary props here
  },
  setup(props, { emit }) {
    const overlayVisible = ref(false);
    const channelName = ref('');
    const channelPassword = ref('');
    const isPublic = ref(false);

    const openOverlay = () => {
      overlayVisible.value = true;
    };

    const closeOverlay = () => {
      overlayVisible.value = false;
      // You can reset form fields here if needed
      channelName.value = '';
      channelPassword.value = '';
      isPublic.value = false;
    };

    const createChannel = () => {
      // Validate and create channel logic here
      const channelData = {
        name: channelName.value,
        password: channelPassword.value,
        isPublic: isPublic.value,
      };

      // Emit an event to the parent component with the created channel data
      emit('channel-created', channelData);

      // Close the overlay after creating the channel
      closeOverlay();
    };

    return {
      overlayVisible,
      channelName,
      channelPassword,
      isPublic,
      openOverlay,
      closeOverlay,
      createChannel,
    };
  },
});
</script>

<style scoped>
/* Add style */
</style>

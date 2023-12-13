<template>
<!-- <div v-if="isOpen" class="overlay"> -->
   <div class="content">
     <form @submit.prevent="submitForm">
       <label for="channelName">Channel Name:</label>
       <input v-model="channelName" id="channelName" type="text" required />

       <label for="password">Password:</label>
       <input v-model="password" id="password" type="password" />

       <button type="submit">Create Channel</button>
     </form>
     <button @click="closeOverlay">Close</button>
   </div>
<!-- </div> -->
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent ({
name: 'ChannelCreation',
  props: {
    isOpen: Boolean,
    onClose: Function,
    onSubmit: Function,
  },

  setup(props, { emit }) {
    const channelName = ref('');
    const password = ref('');

    const submitForm = () => {
      props.onSubmit({ channelName: channelName.value, password: password.value });
      closeOverlay();
    };

    const closeOverlay = () => {
      channelName.value = ''; // Clear form on close
      password.value = '';
      props.onClose();
    };

    return { channelName, password, submitForm, closeOverlay };
  },

});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>

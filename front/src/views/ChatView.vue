<template>
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
};
</script>

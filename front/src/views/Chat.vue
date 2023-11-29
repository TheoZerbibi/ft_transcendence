<template>
	<Suspense>
		<template #default>
			<ChatWindow />
		</template>

		<template #fallback>
			<p>Loading </p>
		</template>
	</Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import ChatWindow from '../components/chat/ChatWindow.vue';

export default defineComponent({
	name: 'ChatView',

	components: { ChatWindow },
});
</script>


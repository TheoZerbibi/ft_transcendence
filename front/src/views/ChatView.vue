<template>
	<Suspense>
		<template #default>
			<discord />
		</template>

		<template #fallback>
			<p>Loading Chat</p>
		</template>
	</Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Discord from '../components/chat/Discord.vue';

export default defineComponent({
	name: 'ChatView',

	components: { Discord },
});
</script>

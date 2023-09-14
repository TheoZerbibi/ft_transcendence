<template>
	<Suspense>
		<template #default>
			<game />
		</template>

		<template #fallback>
			<p>Loading Game</p>
		</template>
	</Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured } from 'vue';

// Components
import Game from '../components/Game.vue';

onErrorCaptured((e, instance, info) => {
	console.log(e, instance, info)
})

export default defineComponent({
	name: 'GameView',

	components: { Game },
});
</script>

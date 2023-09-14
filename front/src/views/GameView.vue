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
import { defineComponent } from 'vue';

// Components
import Game from '../components/Game.vue';

export default defineComponent({
	name: 'GameView',

	components: { Game },
});
</script>

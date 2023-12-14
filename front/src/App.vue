<template>
	<v-app id="app" :style="{ backgroundColor: backgroundColor }">
		<v-main class="d-flex" style="min-height: 300px">
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useBackgroundColorStore } from './stores/background'; // Adjust the path accordingly

export default {
	setup() {
		const backgroundColorStore = useBackgroundColorStore();
		const backgroundColor = computed(() => backgroundColorStore.backgroundColor);

		return {
			backgroundColor,
		};
	},
};
</script>

<style scoped>
#app {
	transition: background-color 0.3s ease;
	overflow: hidden;
}
</style>

<template>
	<v-app id="app" :style="{ backgroundColor: backgroundColor }">
		<router-view />
	</v-app>
</template>

<script lang="ts">
import { computed, watch } from 'vue';
import { useBackgroundColorStore } from './stores/background';
import { useUser } from './stores/user';
import { useOnlineSocketStore } from './stores/online';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';

export default {
	setup() {
		const backgroundColorStore = useBackgroundColorStore();
		const userStore = useUser();
		const onlineSocketStore = useOnlineSocketStore();

		const backgroundColor = computed(() => backgroundColorStore.backgroundColor);

		watch(
			() => userStore.getJWT,
			(newJWT, oldJWT) => {
				if (newJWT && newJWT !== oldJWT) {
					onlineSocketStore.connect(newJWT);
				} else if (!newJWT) {
					onlineSocketStore.disconnect();
				}
			},
			{ immediate: true },
		);

		onUnmounted(() => {
			onlineSocketStore.disconnect();
		});

		return {
			backgroundColor,
		};
	},
	computed: {
		isAppVisible() {
			return this.$route.name === 'Chat';
		},
	}
};
</script>

<style scoped>
#app {
	transition: background-color 0.3s ease;
	/* overflow: hidden; */
}
</style>

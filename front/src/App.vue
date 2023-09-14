<template>
	<v-app :style="{ backgroundColor: color }">
		<v-main>
<<<<<<< HEAD
			<router-view />
=======
			<router-view></router-view>
>>>>>>> 0d8a423 (localhost:3000/secret)
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
	data() {
		return {
			color: '#2e2e2e',
		};
	},
});
</script>

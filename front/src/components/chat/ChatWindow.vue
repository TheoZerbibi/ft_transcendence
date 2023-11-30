<template>
	<main>
		<div
			v-if="apiData"
			:style="{
				backgroundImage: `url(${background})`,
				backgroundPosition: 'center center',
				backgroundSize: 'cover',
			}"
			class="container d-flex align-center justify-center"
		>
		</div>
	</main>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useSnackbarStore } from '../../stores/snackbar';
import { useUser } from '../../stores/user';
import { useSocketStore } from '../../stores/websocket';
import Snackbar from '../layout/Snackbar.vue';

const snackbarStore = useSnackbarStore();

export default {
	name: 'ChatWindow',
	data() {
		return {
			apiData: null as any,
			background: '/chat/background/space-parallax.png', // Set the fixed background image path here
		};
	},
	mounted() {
		this.apiData = this.$route.params;
	},
};
</script>

<style scoped>

.container {
	overflow: hidden;
	height: 100vh;
}

</style>

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
			background: null as any,
		};
	},
	async beforeMount() {
		const backgroundList: string[] = [];
		const images = import.meta.glob('/public/game/battleBackground/*.png');
		for (const path in images) {
			backgroundList.push(path);
		}
		this.background = backgroundList[Math.floor(Math.random() * backgroundList.length)];
		this.background = this.background.replace('/public', '');
	}, mounted() {
		this.apiData = this.$route.params;
	},
};
</script>

<style scoped>
@font-face {
	font-family: 'OMORI_MAIN';
	src: url('/fonts/OMORI_GAME.ttf') format('truetype-variations');
}

@font-face {
	font-family: 'OMORI_DISTURBED';
	src: url('/fonts/OMORI_GAME2.ttf') format('truetype-variations');
}

h4 {
	font-family: 'OMORI_MAIN', sans-serif;
	font-size: xx-large;
	text-align: center;
	color: rgb(65, 37, 37);
	text-shadow:
		1px 1px 2px plum,
		0 0 1em rgb(255, 123, 255),
		0 0 0.2em rgb(255, 255, 255);
}

.container {
	overflow: hidden;
	height: 100vh;
}

</style>

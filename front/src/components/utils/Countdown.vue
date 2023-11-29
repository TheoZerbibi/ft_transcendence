<template>
	<v-overlay :model-value="showOverlay" class="align-center justify-center countdown-overlay" persistent>
		<v-container>
			<v-col>
				<v-card class="countdown-card" color="transparent">
					<v-card-text>
						<v-row justify="center" class="countdown-icon"> {{ seconds }} </v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-container>
	</v-overlay>
</template>

<script lang="ts">
import { computed } from 'vue';

import { useCountdownStore } from '../../stores/countdown';

export default {
	name: 'GameCountdown',
	setup() {
		const countdownStore = useCountdownStore();
		const seconds = computed(() => countdownStore.seconds);

		return {
			seconds,
		};
	},
	data() {
		return {
			showOverlay: true,
		};
	},
};
</script>
<style scoped>
.countdown-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 9998;
	display: flex;
	justify-content: center;
	align-items: center;
}

.countdown-card {
	text-align: center;
	color: #333;
	z-index: 9999;
	width: auto;
	height: auto;
	display: inline-block;
}

.countdown-icon {
	font-size: 5rem;
	color: #ffffff;
	z-index: 9999;
	width: auto;
	height: auto;
	margin: 10rem;
}
</style>

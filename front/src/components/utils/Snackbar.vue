// eslint-disable-next-line vue/multi-word-component-names
<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import { useSnackbarStore } from '../../stores/snackbar';

const snackbarStore = useSnackbarStore();
const { snackbar, text, timeout, color } = storeToRefs(snackbarStore);

export default defineComponent({
	name: 'Snackbar',
	setup() {
		return {
			snackbar,
			text,
			timeout,
			color,
		};
	},
});
</script>

<template>
	<v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
		{{ text }}
	</v-snackbar>
</template>

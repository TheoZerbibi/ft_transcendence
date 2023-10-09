<template>
	<v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
		{{ text }}
	</v-snackbar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useSnackbarStore } from '../../stores/snackbar';

const snackbarStore = useSnackbarStore();
const { snackbar, text, timeout, color } = storeToRefs(snackbarStore);
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Snackbar',
});
</script>

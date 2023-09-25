// eslint-disable-next-line vue/multi-word-component-names
<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useSnackbarStore } from '../../stores/snackbar';

const snackbarStore = useSnackbarStore();
const { snackbar, text, timeout, color } = storeToRefs(snackbarStore);
</script>

<template>
	<v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
		{{ text }}
	</v-snackbar>
</template>

<template>
	<v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
		{{ text }}
	</v-snackbar>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useSnackbarStore } from '../../stores/snackbar';

const snackbarStore = useSnackbarStore();
const { snackbar, text, timeout, color } = storeToRefs(snackbarStore);
</script>

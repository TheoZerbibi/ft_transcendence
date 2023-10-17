<script lang="ts">
import { defineComponent } from 'vue';

import { useSnackbarStore } from '../../stores/snackbar';
import Snackbar from '../utils/Snackbar.vue';

const snackbarStore = useSnackbarStore();

export default defineComponent({
	components: { Snackbar },
	methods: {
		active: function () {
			if (snackbarStore.snackbar == false) snackbarStore.showSnackbar('Hello World!', 5000, 'purple');
			else snackbarStore.hideSnackbar();
		},
	},
});
</script>

<template>
	<v-card class="d-flex align-center justify-center" min-height="100%" color="transparent">
		<v-btn color="primary" dark absolute top:style="{left: '50%', transform:'translateX(-50%)'}" @:click="active()">
			Snackbar
		</v-btn>
		<Snackbar />
	</v-card>
</template>

<script>
import { defineComponent } from 'vue';
import Snackbar from '../utils/Snackbar.vue';
import { useSnackbarStore } from '../../stores/snackbar';

const snackbarStore = useSnackbarStore();

export default defineComponent({
	components: { Snackbar },
	data() {
		return {
			color: '#2e2e2e',
		};
	},
	methods: {
		active: function () {
			if (snackbarStore.snackbar == false) snackbarStore.showSnackbar('Hello World!', 5000, 'purple');
			else snackbarStore.hideSnackbar();
		},
	},
});
</script>

<template>
	<v-card class="d-flex align-center justify-center" min-height="100%" :style="{ backgroundColor: color }">
		<v-btn color="primary" dark absolute top:style="{left: '50%', transform:'translateX(-50%)'}" @:click="active()">
			Snackbar
		</v-btn>
	</v-card>
	<Snackbar />
</template>

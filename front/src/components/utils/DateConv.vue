<template>
	<span>
		{{ formattedDate }}
		<v-tooltip activator="parent" location="top">
			{{ fullDate }}
		</v-tooltip>
	</span>
</template>

<script lang="ts">
import { format } from 'date-fns';

export default {
	props: {
		timestamp: String,
	},
	computed: {
		fullDate() {
			try {
				const date = new Date(this.timestamp);
				return format(date, 'dd/MM/yyyy HH:mm');
			} catch (error) {
				return 'Invalid date';
			}
		},
		formattedDate() {
			try {
				const date = new Date(this.timestamp);
				return format(date, 'HH:mm');
			} catch (error) {
				return 'Invalid date';
			}
		},
	},
};
</script>

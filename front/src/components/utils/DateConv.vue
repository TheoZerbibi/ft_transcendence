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
			const date = new Date(this.timestamp);
			return format(date, 'dd/MM/yyyy');
		},
		formattedDate() {
			const date = new Date(this.timestamp);
			return format(date, 'HH:mm');
		},
	},
};
</script>

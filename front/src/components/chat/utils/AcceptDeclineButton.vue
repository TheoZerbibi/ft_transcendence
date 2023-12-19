<template>
	<v-btn
		flat
		rounded="0"
		density="compact"
		:ripple="false"
		:class="`${buttonType}`"
		@click="emitResponse">
		{{ buttonText }}
	</v-btn>
</template>

<script lang="ts">
export default {
	props: {
		login: String,
		response: Boolean,
	},
	computed: {
		buttonText() {
			return this.response ? 'v' : 'x';
		},
		buttonType() {
			return this.response ? 'accept' : 'reject';
		}
	},
	methods: {
		emitResponse() {
			this.$emit('respond', this.login, this.response);
		}
	}
};
</script>

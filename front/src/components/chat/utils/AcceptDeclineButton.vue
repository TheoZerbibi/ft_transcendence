<template>
	<v-btn
		flat
		rounded="0"
		density="compact"
		:ripple="false"
		:icon="buttonIcon"
		:class="`${buttonType}`"
		@click="emitResponse">
	</v-btn>
</template>

<script lang="ts">
export default {
	props: {
		login: String,
		response: Boolean,
	},
	computed: {
		buttonIcon() {
			return this.response ? 'fas fa-check' : 'fas fa-close';
		},
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

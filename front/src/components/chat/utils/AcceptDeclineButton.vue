<template>
	<button :class="`${buttonType}`" @click="emitResponse">
		{{ buttonText }}
	</button>
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

<style scoped>
.accept {
	background-color: green;
}
.reject {
	background-color: red;
}

</style>

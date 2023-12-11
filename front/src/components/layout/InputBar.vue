<template>
	<input
		type="text"
		class="white--text omoriFont font-weight-black uppercase-placeholder"
		:placeholder="placeholder"
		@input="handleInput"
		style="{
			background-color: #000000;
			border-color: #ffffff;
			border: 3px solid;
			padding: 6px;
			position: relative;
			font-size: 20px;
			height: 50px;
			width: 250px;
		}"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: "InputBar",
	props: {
		placeholder: {
			type: String,
			default: 'Input'
		},
	},
	methods: {
		handleInput(event: any) {
			const input = event.target.value;
			this.$emit("newInput", input);
		},
	},
});
</script>

<style scoped>
.uppercase-placeholder::placeholder {
    text-transform: uppercase;
}
</style>

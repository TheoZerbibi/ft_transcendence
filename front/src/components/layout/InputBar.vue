<template>
	<form @submit.prevent="handleInput" id="input">
		<input
		type="text"
		class="white--text omoriFont font-weight-black input-field uppercase-placeholder"
		:placeholder="placeholder"
		v-model="inputValue"
		:style="{ width: width + 'px', height: height + 'px' }"
		@click.prevent.stop
		/>
		<Button @click="handleInput" :style="{ width: width + 'px', height: height + 'px'}">
			<slot></slot>
		</Button>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from './Button.vue';

export default defineComponent({
	name: "InputBar",
	components: {
		Button
	},
	props: {
		placeholder: {
			type: String,
			default: 'Input'
		},
		width: {
			type: String,
			default: '250px'
		},
		height: {
			type: String,
			default: '50px'
		},
	},
	setup(props, { emit }) {
		const inputValue = ref(''); // Use Vue 3's ref to create a reactive variable

		function handleInput() {
			emit("newInput", inputValue.value);
			inputValue.value = ''; // Clear the input field
		}

		return {
			inputValue,
			handleInput
		};
	},
});
</script>

<style scoped>
.uppercase-placeholder::placeholder {
    text-transform: uppercase;
}

.input-field {
	position: relative;
	width: 250px;
	height: 50px;
	background-color: #000000;
	border: 3px solid;
	box-sizing: border-box;
	border-color: #ffffff;
	font-size: 20px;
	letter-spacing: 0;
	line-height: normal;
	white-space: nowrap;
	padding: 0px 0px 0px 10px;
}

input:focus {
	outline: none;
}
</style>
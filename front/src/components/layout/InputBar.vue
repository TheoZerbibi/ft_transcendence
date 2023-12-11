<template>
	<form @submit.prevent="handleInput" id="input">
		<input
		type="text"
		class="white--text omoriFont font-weight-black input-field uppercase-placeholder"
		:placeholder="placeholder"
		v-model="inputValue"
		/>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: "InputBar",
	props: {
		placeholder: {
			type: String,
			default: 'Input'
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

.input-field-stroke {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
	position: relative;
	width: 250px;
	height: 50px;
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

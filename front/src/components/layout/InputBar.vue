<template>
	<form @submit.prevent="handleInput" id="input">
		<input
		type="text"
		class="white--text omoriFont font-weight-black input-field uppercase-placeholder"
		:placeholder="placeholder"
		v-model="inputValue"
		:style="{ width: width + 'dvh', height: height + 'dvh', color: color, margin: margin }"
		@click.prevent.stop
		/>
		<Button @click="handleInput" :style="{ width: width + 'dvh', height: height + 'dvh', color: color, margin: margin}">
			<slot name="buttonText"/>
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
			type: Number,
			default: 25
		},
		height: {
			type: Number,
			default: 5
		},
		color: {
			type: String,
			default: '#ffffff'
		},
		margin: {
			type: String,
			default: '1dvh'
		}
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

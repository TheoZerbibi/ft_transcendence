<template>
	<v-btn
		class="white--text omoriFont font-weight-black "
		color="black"
		rounded="0"
		size="large"
		@click="handleClick" 
		:width="width" 
		:height="height"
		:ripple="false"
		style="{
			background-color: #000000;
			border-color: #ffffff;
			border: 3px solid;
			margin: 16px;
			padding: 6px;
			display: flex;
			position: relative;
			font-size: 20px;
		}"
	>
		<slot></slot>
	</v-btn>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: "ButtonBox",
	props: {
		width: {
			type: String,
			default: '100px'
		},
		height: {
			type: String,
			default: '50px'
		},
		onClick: {
			type: Function,
			default: () => {}
		}
	},
	methods: {
		handleClick() {
			this.onClick();
		}
	}
});
</script>
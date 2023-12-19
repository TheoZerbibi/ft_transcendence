<template>
	<v-btn
		class="omoriBtn font-weight-black elevation-0"
		rounded="0"
		size="large"
		@click="handleClick"
		:ripple="false"
		:style="{
			width: width + 'dvh',
			height: height + 'dvh',
			color: color,
			margin: margin,
			border: border,
			outline: '1px solid black',
			'background-color': backgroundColor,
			'font-family': font,
			'font-size': fontSize + 'px',
		}"
	>
		<slot></slot>
	</v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ButtonBox',
	props: {
		width: {
			type: Number,
			default: 25,
		},
		height: {
			type: Number,
			default: 5,
		},
		onClick: {
			type: Function,
			default: () => {},
		},
		color: {
			type: String,
			default: 'white',
		},
		margin: {
			type: String,
			default: '1dvh',
		},
		border: {
			type: String,
			default: 'white 3px solid',
		},
		backgroundColor: {
			type: String,
			default: 'black',
		},
		font: {
			type: String,
			default: 'OMORI_MAIN',
		},
		fontSize: {
			type: Number,
			default: 20,
		},
	},
	methods: {
		handleClick() {
			this.onClick();
		},
	},
});
</script>

<style scoped>
.omoriBtn {
	display: flex;
	position: relative;
	font-size: 20px;
}
</style>

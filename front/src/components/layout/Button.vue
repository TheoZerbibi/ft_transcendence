<template>
	<v-btn
		class="white--text omoriFont omoriBtn font-weight-black elevation-0"
		color="black"
		rounded="0"
		size="large"
		@click="handleClick" 
		:ripple="false"
		:style="{ width: width + 'dvh', height: height + 'dvh' }">
		<slot></slot>
	</v-btn>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: "ButtonBox",
	props: {
		width: {
			type: Number,
			default: 25
		},
		height: {
			type: Number,
			default: 5
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

<style scoped>
.omoriBtn {
	background-color: #000000;
	border-color: #ffffff;
	border: 3px solid;
	display: flex;
	position: relative;
	font-size: 20px;
}
</style>
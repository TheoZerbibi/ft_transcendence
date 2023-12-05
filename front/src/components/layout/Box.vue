<template>
	<div class="box" :style="{ width: width, height: height }">
		<div class="rectangle">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';

export default {
	name: "Box",
	props: {
		width: {
			type: String,
			default: "100px",
		},
		height: {
			type: String,
			default: "50px",
		},
	}
};
</script>

<style>
.box .rectangle {
	background-color: #000000;
	border-color: #ffffff;
	border: 3px solid;
	margin: 16px;
	padding: 6px;
 	display: flex;
	position: relative;
}

.box-container {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}
</style>
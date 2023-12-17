<template>
	<v-card class="d-flex flex-column align-start justify-center rounded-0 box" :style="{ 'min-width': width, 'min-height': height }">
		<slot></slot>
	</v-card>
</template>

<script>
import { defineComponent } from 'vue';

export default {
	name: "Box",
	props: {
		width: {
			type: String,
			default: "30dvh",
		},
		height: {
			type: String,
			default: "10dvh",
		},
	}
};
</script>

<style>
.box {
	background-color: #e0e0e0;
	border: black solid thick;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	flex-grow: 1;
	flex-shrink: 1;
}

</style>
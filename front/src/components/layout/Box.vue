<template>
	<v-card 
		class="d-flex flex-column align-start justify-center rounded-0 box"
		:style="{ 'width': width, 'height': height }">
		<slot></slot>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default {
	name: "Box",
	props: {
		width: {
			type: String,
			default: "auto",
		},
		height: {
			type: String,
			default: "auto",
		},
	}
};
</script>

<style>
.box {
	background-color: #e0e0e0;
	border: black solid thick;
}

</style>
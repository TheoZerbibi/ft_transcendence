<template>
	<v-card 
		class="d-flex flex-column align-start justify-center rounded-0 box"
		:style="{ 'width': width, 'height': height }">
		<slot></slot>
	</v-card>
</template>

<script lang="ts">
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
	background-color: #ffffff;
	border: black solid thin;
}

</style>

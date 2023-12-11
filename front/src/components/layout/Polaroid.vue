<template>
	<div 
		id="polaroid"
		align="center"
		justify="center"
		:style="{ width: width + 'dvh', height: height + 'dvh'}"
	>
		<slot name="polaroidImg" class="slot-image"></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Polaroid',
	props: {
		width: {
			type: String,
			default: "25dvh",
		},
		height: {
			type: String,
			default: "30dvh",
		},
	},
});
</script>

<style scoped>
#polaroid {
	background-image: url('/public/ui/polaroid.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	aspect-ratio: 1;
	position: relative;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;
}

.slot-image {
	object-fit: cover;
	z-index: 0;
}
</style>
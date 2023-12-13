<template>
	<form id="polaroid" :style="{ width: width + 'dvh', height: height + 'dvh' }">
		<label for="file" class="uploadLabel hoverable">
			<div
				class="uploadImg align-self-center justify-center"
				@mouseover="showOverlay = true"
				@mouseleave="showOverlay = false"
			>
				<slot name="polaroidImg" class="polaroidImg"></slot>
			</div>
			<input id="file" type="file" @change="handleFileChange" />
		</label>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'UploadFile',
	props: {
		width: {
			type: Number,
			default: 25,
		},
		height: {
			type: Number,
			default: 30,
		},
	},
	setup(props, { emit }) {
		const file = ref('');
		const showOverlay = ref(false);

		function handleFileChange(event: any) {
			file.value = event.target.files[0];
			emit('imageChanged', file.value);
		}

		return {
			file,
			handleFileChange,
			showOverlay,
		};
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
	padding: 2dvh 2dvh 0dvh 2dvh;
	z-index: 2;
	position: relative;
}

.uploadLabel input {
	display: none;
}

.uploadImg {
	aspect-ratio: 1;
	z-index: 1;
}

.uploadImg::before {
	content: url('/public/login/upload.svg');
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.uploadImg:hover::before {
	opacity: 0.8;
}

.uploadImg {
	aspect-ratio: 1;
	width: inherit;
	height: inherit;
	object-fit: cover;
}
</style>

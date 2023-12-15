h<template>
	<form id="polaroid" :style="{ width: width + 'dvh', height: height + 'dvh' }">
		<label for="file" class="uploadLabel hoverable">
			<div class="uploadImg" 
				@mouseover="showOverlay = true"
				@mouseleave="showOverlay = false"
				>
				<slot name="polaroidImg"/>
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
	background-image: url('/ui/polaroid.png');
	background-color: #110901;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	aspect-ratio: 1;
	z-index: 2;
	position: relative;
}

.uploadLabel input {
	display: none;
}

.uploadImg {
	aspect-ratio: 1;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1.5dvh;
}

.uploadImg::before {
	content: url('/public/login/upload.svg');
	position: absolute;
	width: inherit;
	height: inherit;
	z-index: 2;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.uploadImg:hover::before {
	opacity: 0.8;
}
</style>

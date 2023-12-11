<template>
	<form id="polaroid">
		<div style="
			justify-content: center;
			align-items: center;
			display: flow-root;
			position: relative;
			width: 220px;
			height: 220px;
			top: -23px;"
		>
			<slot name="image" class-="slot-image"></slot>
			<label for="file" class="file-upload-label hoverable">
				<img src="../../../public/login/upload.svg" class="file-upload-design hoverable" alt="image" />
				<input id="file" type="file" @change="handleFileChange" />
			</label>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent ({
	name: 'UploadFile',
	setup(props, { emit }) {
		const file = ref("")

		function handleFileChange(event: any) {
			file.value = event.target.files[0];
			emit('imageChanged', file.value);
		}

		return {
			file,
			handleFileChange
		};
	},
});
</script>

<style scoped>

#polaroid {
	background-image: url('/public/ui/Polaroid.svg');
 	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	aspect-ratio: 1;
	position: relative;
	height: inherit;
	width: inherit;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 0;
}


.file-upload-label input {
	display: none;
}

.file-upload-design {
	object-fit: cover;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.slot-image {
	object-fit: cover;
}

.file-upload-design:hover {
	opacity: 0.8;
}

</style>

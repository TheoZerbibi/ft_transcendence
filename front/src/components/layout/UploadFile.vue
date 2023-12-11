<template>
	<div>
		<form id="polaroid">
			<div style="
		  		width: 220px;
		  		height: 220px;
				position: relative;"
			>
				<label for="file" class="file-upload-label hoverable">
					<div class="slot-image" 
						@mouseover="showOverlay = true"
						@mouseleave="showOverlay = false">
						<slot name="polaroidImg"></slot>
					</div>
					<input id="file" type="file" @change="handleFileChange" />
				</label>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from './Button.vue';

export default defineComponent({
	name: 'UploadFile',
	components: {
		Button
	},
	props: {
		buttonWidth: {
			type: String,
			default: '250px'
		},
		buttonHeight: {
			type: String,
			default: '50px'
		},
		polaroidWidth: {
			type: String,
			default: '25dvh'
		},
		polaroidHeight: {
			type: String,
			default: '30dvh'
		},
	},
	setup(props, { emit }) {
		const file = ref("")
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
	height: inherit;
	width: inherit;
	padding: 2dvh 2dvh 0dvh 2dvh;
	z-index: 2;
}

.file-upload-label input {
	display: none;
}

.slot-image {
	display: flex;
	align-items: center;
	justify-content: center;
	object-fit: cover;
	top: 0;
	left: 0;
	z-index: 1;
}

.slot-image::before {
	content: url('/public/login/upload.svg');
	position: absolute;
	top: 25%;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: 2;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.slot-image:hover::before {
	opacity: 0.8;
}
</style>

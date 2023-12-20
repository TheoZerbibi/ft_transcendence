<template>
	<v-container
		fluid
		fill-height
		:style="{
			height: '100dvh',
			backgroundImage: 'url(/OmoriWallpaper/404_background.png)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			'object-fit': 'cover',
			'aspect-ratio': 1,
			backgroundSize: '100% 100%',
			marginTop: '0',
		}"
	>
		<div
			:style="{
				position: 'absolute',
				top: '0%',
				left: '50%',
				transform: 'translate(-50%)',
			}"
		>
			<v-img
				:src="currentBulbImage"
				class="bulb"
				style="image-rendering: pixelated; width: 100px; height: 100px;"
				@mouseover="changeBulbImage"
				@mouseleave="resetBulbImage"
				@click="redirectToHome"
			/>
		</div>
		<v-row align="center" justify="center" class="fill-height">
			<v-col class="text-center d-flex flex-column align-center">
				<h1 class="mt-4 omoriDisturbed" style="color: white;">...are you lost?</h1>
			</v-col>
		</v-row>
	</v-container>
	<Sound :folder="'/sounds/404'" />
</template>

<script lang="ts">
import Sound from '../components/utils/Sound.vue';

export default {
	name: 'PageNotFound',
	components: { Sound },
	data() {
		return {
			bulbImages: ['/ui/404/bulb0.png', '/ui/404/bulb1.png', '/ui/404/bulb2.png'],
			currentImageIndex: 0,
			intervalId: null,
		};
	},
	computed: {
		currentBulbImage() {
			return this.bulbImages[this.currentImageIndex];
		},
	},
	methods: {
		changeBulbImage() {
			this.intervalId = setInterval(() => {
				this.currentImageIndex = (this.currentImageIndex + 1) % this.bulbImages.length;
			}, 500);
		},
		resetBulbImage() {
			clearInterval(this.intervalId);
			this.currentImageIndex = 0;
		},
		redirectToHome() {
			this.$router.push({ name: 'Home' });
		},
	},
};
</script>

<style scoped>
.bulb {
	position: relative;
	transition: opacity 0.3s ease;
	object-fit: contain; /* Do not scale the image */
}

</style>

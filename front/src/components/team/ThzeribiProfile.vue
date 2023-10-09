<template>
	<v-card class="d-flex align-center justify-center backgroundWallpaper" min-height="100%" color="transparent">
		<v-card-title class="text-center">Team Profile</v-card-title>
		<v-card-text class="text-center">
			{{ login }}
		</v-card-text>
	</v-card>
</template>

<script></script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Thzeribi',

	data() {
		return {
			login: 'thzeribi' as string,
		};
	},
});
</script>

<style>
.backgroundWallpaper {
	background-image: url('/src/assets/OmoriWallpapers/OmoriWallpaper004.png');
	background-size: 100% 100%;
	margin: 0px auto;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: center;
	background-color: black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	color: black;
}
</style>

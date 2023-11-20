<template>
<<<<<<< HEAD
	<h1>Team Profile page</h1>
=======
	<v-card class="d-flex align-center justify-center backgroundWallpaper" min-height="100%" color="transparent">
		<v-card-title class="text-center">Team Profile</v-card-title>
		<v-card-text class="text-center">
			{{ login }}
		</v-card-text>
	</v-card>
>>>>>>> c80165e (fix: github issue)
</template>

<script></script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
<<<<<<< HEAD
	name: 'Grannou',
=======
	name: 'GrannouProfile',
>>>>>>> c80165e (fix: github issue)

	data() {
		return {
			login: 'grannou' as string,
		};
	},
});
</script>
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
<<<<<<< HEAD
<style></style>
=======
<style>
</style>
>>>>>>> 2e60013 (just vuetify icon works)
=======
<style></style>
>>>>>>> 3b9f6f4 (clean files)
=======
>>>>>>> 8f38e0e (chore: Fix linter error)
=======

<style>
.backgroundWallpaper {
	background-image: url('/src/assets/OmoriWallpapers/OmoriWallpaper008.png');
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
>>>>>>> c80165e (fix: github issue)

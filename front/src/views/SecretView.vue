<template>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f5dd314 (core:feat /secret done)
	<div class="row">
		<div class="column">
			<img src="/src/assets/OmoriWallpapers/OmoriRecipes01.jpg" />
			<img src="/src/assets/OmoriWallpaper01.jpg" />
		</div>
		<div class="column">
			<img src="/src/assets/OmoriWallpaper01.jpg" />
			<img src="/src/assets/OmoriWallpapers/OmoriRecipes03.jpg_large" />
		</div>
		<div class="column">
			<img src="/src/assets/OmoriWallpapers/OmoriRecipes02.jpg" />
			<img src="/src/assets/OmoriWallpaper01.jpg" />
		</div>
<<<<<<< HEAD

<<<<<<< HEAD
	</div>

=======
	<div class="image-row">
		<img src="/src/assets/OmoriWallpapers/OmoriRecipes01.jpg" alt="Image 1">
		<p>Hello</p>
		<img src="/src/assets/OmoriWallpapers/OmoriRecipes02.jpg" alt="Image 2">
	</div>
>>>>>>> 374b499 (/colors page added)
=======
	</div>

>>>>>>> f5dd314 (core:feat /secret done)
=======
	</div>
>>>>>>> 8f38e0e (chore: Fix linter error)
</template>

<script></script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Secret',
	data() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f5dd314 (core:feat /secret done)
		return {
			images: [
				{
					id: 1,
					photo: '/src/assets/OmoriWallpaper01.jpg',
				},
				{
					id: 2,
					photo: '/src/assets/OmoriWallpapers/OmoriRecipes01.jpg',
				},
				{
					id: 3,
					photo: '/src/assets/OmoriWallpapers/OmoriRecipes02.jpg',
				},
			],
		};
<<<<<<< HEAD
=======
		return;
		{
		}
>>>>>>> 374b499 (/colors page added)
=======
>>>>>>> f5dd314 (core:feat /secret done)
	},
});
</script>

<style>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f5dd314 (core:feat /secret done)
.row {
	display: flex;
	flex-wrap: wrap;
	padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column {
	flex: 33%;
	max-width: 33%;
	padding: 0 4px;
}

.column img {
	margin-top: 8px;
	vertical-align: middle;
	width: 100%;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
	.column {
		flex: 50%;
		max-width: 50%;
	}
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
	.column {
		flex: 100%;
		max-width: 100%;
	}
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 374b499 (/colors page added)
=======
>>>>>>> f5dd314 (core:feat /secret done)

=======
>>>>>>> 8f38e0e (chore: Fix linter error)
</style>

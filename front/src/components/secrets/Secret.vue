<template>
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
	</div>
</template>

<script></script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Secret',
	data() {
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
	},
});
</script>

<style>
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
</style>


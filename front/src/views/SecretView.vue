<template>
	<v-row>
		<v-col>
			<v-card class="halfBackground">
				<img src="/src/assets/OmoriWallpapers/OmoriRecipes01.jpg"/>
				<!-- <img :src="leftBackgroundWallpaper"/> -->
			</v-card>
		</v-col>
		<v-col>
			<v-card class="halfBackground">
				<img src="/src/assets/OmoriWallpapers/OmoriRecipes01.jpg"/>
				<!-- <img :src="rightBackgroundWallpaper"/> -->
			</v-card>
		</v-col>
	</v-row>
		<!-- <v-card class="leftBackgroundWallpaper"> -->
		<!-- </v-card> -->
		<!-- <v-card class="rightBackgroundWallpaper"> -->
		<!-- </v-card> -->
</template>

<script>
</script>

<script lang='ts'>
import { defineComponent } from 'vue'
import leftBackgroundWallpaper from '/src/assets/OmoriWallpapers/OmoriRecipes01.jpg'
import rightBackgroundWallpaper from '/src/assets/OmoriWallpapers/OmoriRecipes02.jpg'

export default defineComponent({
  name: 'Secret',

  data ()
  {
	return
    {
		leftBackgroundWallpaper;
		rightBackgroundWallpaper;
    }
}
})
</script>

<style>
	.halfBackground
	{
    	background-size: 50% 50%;
	}
    .leftBackgroundWallpaper
    {
    	background-image: url('/src/assets/OmoriWallpapers/OmoriRecipes01.jpg');
    	background-size: 50% 50%;
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
	.rightBackgroundWallpaper
    {
    	background-image: url('/src/assets/OmoriWallpapers/OmoriRecipes02.jpg');
    	background-size: 50% 50%;
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

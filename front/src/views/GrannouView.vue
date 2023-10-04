<template>
    <v-card class="backgroundWallpaper">
    </v-card>
</template>

<script>
</script>

<script lang='ts'>
import { defineComponent } from 'vue'
import backgroundWallpaper from '/src/assets/OmoriWallpapers/OmoriWallpaper008.png'

export default defineComponent({
  name: 'Grannou',

  data ()
  {
	return
    {
		backgroundWallpaper
    }
}
})
</script>

<style>
    .backgroundWallpaper
    {
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

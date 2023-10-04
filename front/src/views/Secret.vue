<template>
    <v-card class="backgroundWallpaper">
    </v-card>
</template>

<script>
</script>

<script lang='ts'>
import { defineComponent } from 'vue'
import backgroundWallpaper from '../assets/OmoriWallpaper05.jpg'

export default defineComponent({
  name: 'Secret',

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
    	background-image: url('/src/assets/OmoriWallpaper05.jpg');
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

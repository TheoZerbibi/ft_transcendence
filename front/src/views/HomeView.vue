<template>
	<div>
		<h1>Home Page</h1>
		<v-btn @click="$router.push('/portfolio')" class="text-capitalize" rounded color=orange variant="outlined">Go to portfolio</v-btn>
		<br />
		<button class="button button1">2px</button>
		<button class="button button2">4px</button>
		<button class="button button3">8px</button>
		<button class="button button4">12px</button>
		<button class="button button5">50%</button>
	</div>
	
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
});
</script>

<style scoped>
	.button {
	  background-color: orange;
	  border: none;
	  color: black;
	  padding: 20px;
	  text-align: center;
	  text-decoration: none;
	  display: inline-block;
	  font-size: 16px;
	  margin: 4px 2px;
	}

	.button1 {border-radius: 2px;}
	.button2 {border-radius: 4px;}
	.button3 {border-radius: 8px;}
	.button4 {border-radius: 12px;}
	.button5 {border-radius: 50%;}
</style>


<!-- Vue3 shapes: 
	v-rect, 
	v-circle, 
	v-ellipse, 
	v-line, 
	v-image, 
	v-text, 
	v-text-path, 
	v-star, 
	v-label, 
	v-path, 
	v-regular-polygon -->
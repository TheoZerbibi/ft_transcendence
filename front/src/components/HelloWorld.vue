<template>
	<v-container class="backgroundWallpaper">
		<v-row class="text-center">
			<v-col class="mb-4">
				<h1 class="display-2 font-weight-bold mb-3">
					Welcome to<br> ft_transcendence MEOW team
				</h1>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
				<v-img :src="logo" class="my-3" contain height="140"/>
		    <br>
		    <br>
			<br>
				<br>
				<br>
				<br>
				<br>
				<h4>Starring:</h4>
				<p class="subheading font-weight-regular">
					Théo
					<a
					href="https://profile.intra.42.fr/users/thzeribi"
					target="_blank"
					>(thzeribi 42 Intra profile)</a>
					<br>Ismaël
					<a
					href="https://profile.intra.42.fr/users/iguidado"
					target="_blank"
					>(iguidado 42 Intra profile)</a>
					<br>Gaëlle
					<a
					href="https://profile.intra.42.fr/users/grannou"
					target="_blank"
					>(grannou 42 Intra profile)</a>
					<br>Semiha
					<a
					href="https://profile.intra.42.fr/users/seozcan"
					target="_blank"
					>(seozcan 42 Intra profile)</a>
					<br>Noémi
					<a
					href="https://profile.intra.42.fr/users/nfauconn"
					target="_blank"
					>(nfauconn 42 Intra profile)</a>
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

// Logo
import logo from '../assets/Scoubigang.jpeg'

export default defineComponent({
  name: 'HelloWorld',

  data () {
	return {
	  logo,
	}
  },
})
</script>

<style>
  .backgroundWallpaper{
  	background-image: url('/src/assets/PongWallpaper.jpg');
    background-size: cover;
    background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: center;
	background-color: black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	color: white;
}
</style>
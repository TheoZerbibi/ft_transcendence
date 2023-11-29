<template>
	<v-row align="center" justify="center" class="fill-height background d-flex" id="bg">
		<img src="/ui/Door.png" class="door" alt="These are us" @click="redirectToOAuth" id="polaroid" />
	</v-row>
</template>

<script lang="ts">

export default {
	name: 'SignIn',
	methods: {
		redirectToOAuth() {
			const HOST = import.meta.env.VITE_HOST;
			const PORT = import.meta.env.VITE_API_PORT;

			window.location.href = `http://${HOST}:${PORT}/auth/42/callback`;
		},
	},
};
</script>

<style>
.background {
	background-color: white;
	pointer-events: none;
}

.door {
	height: 40vw;
	z-index: 99999999;
	pointer-events: auto;
}

.door:hover {
	-webkit-filter: brightness(10);
	filter: brightness(10);
	filter: invert(1);
	cursor: url(https://www.omori-game.com/img/cursor/cursor.png), auto;
	-webkit-box-shadow: 0 4px 4px -2px #000000;
	-moz-box-shadow: 0 4px 4px -2px #000000;
	box-shadow: 0 40px 40px -2px #000000;
	transition: 0.5s ease-in-out all;
}

.background:hover {
	background-color: black;
	transition: 1s ease-in-out all;
}

</style>

<template>
	<v-card class="d-flex align-center justify-center"  min-height="100%" v-bind:style="{ backgroundColor: color}">
		<v-btn
			color="blue"
			dark
			absolute
			top:style="{left: '50%', transform:'translateX(-50%)'}"
			v-on:click="doStuff()"
			>
				Join Game
			</v-btn>
			<v-snackbar
			:timeout="2000" v-model="sendSnackbar"
			color="blue"
			>
				Creating a new game...
			</v-snackbar>
			<v-snackbar
			:timeout="2000" v-model="successSnackbar"
			color="green"
			>
				New game is created, redirecting...
			</v-snackbar>
			<v-snackbar
			:timeout="2000" v-model="failSnackbar"
			color="red"
			>
				Failed to create a new game, please try again...
			</v-snackbar>
	</v-card>
</template>


<script lang="ts">

export default {
	name: 'GameView',
	data() {
		return {
			color: '#2e2e2e',
			jwt_token: 'test',
			sendSnackbar: false,
			successSnackbar: false,
			failSnackbar: false,
		}
	},
	methods: {
		doStuff: function() {
			//Show Loader
			this.sendSnackbar = true;
		
			//Waste 5 seconds
			setTimeout(() => {
				this.sendSnackbar = false;
				this.successSnackbar = true;
			}, 3000)
		}
}
}
</script>
<style>
</style>

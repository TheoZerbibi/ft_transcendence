<template>
		<v-row align="center" justify="center" class="fill-height">
		<v-card class="homepage text-center rounded-card"  variant="tonal" color="green darken-4" width="600">
			<v-card-item>	
				<v-card-title class="title">	
					<p class="neonPolice">Welcome to STING's ft_transcendence</p>
					<br />
					<br />
				</v-card-title>

				<v-img src="CatsRounded.png" contain max-height="300" ></v-img>

				<v-card-subtitle>
					Gaëlle, Ismaël, Théo, Semiha, Noé
				</v-card-subtitle>
			</v-card-item>

			<v-card-text>
				students of 42 paris
			</v-card-text>

			<v-card-actions>
				<v-btn
					prepend-icon="mdi-check-circle"
					class="text-capitalize" 
					rounded="xl"
					color="green darken-4"
					variant="outlined"
					size="x-large"
					href="https://intra.42.fr"
					target="_blank">
					<template v-slot:prepend>
    				    <v-icon color="success"></v-icon>
    	  			</template>
						<div class ="neonPolice">
						Authenticate with 42
						</div>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
});
</script>

<style scoped>
.homepage  {
	display: flex;
	align-items: center;
	flex-direction: column;
}

.title {
	display: flex;
	align-items: flex-start;
}

.button {
	display: flex;
	justify-content: flex-end;
}

</style>

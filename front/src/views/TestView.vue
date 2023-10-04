<!-- <v-container>
	<v-row justify="center">
		<v-col>
			<v-card class="countdown-card" outlined>
				<v-card-text>
					<v-row justify="center">
						<v-col cols="12" class="text-center">
							<v-icon large class="countdown-icon">{{ seconds }}</v-icon>
						</v-col>
					</v-row>
				</v-card-text>
				{{ seconds }}
			</v-card>
		</v-col>
	</v-row>
</v-container> -->

<template>
	<div class="text-center">
		<v-btn append-icon="mdi-open-in-new" color="deep-purple-accent-4" @click="showOverlay = !showOverlay">
			Launch Application
		</v-btn>

		<v-overlay :model-value="showOverlay" class="align-center justify-center">
			<v-container>
				<v-col>
					<v-card class="countdown-card" outlined>
						<v-card-text>
							<v-row justify="center"> 10 </v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</v-container>
		</v-overlay>
	</div>
</template>

<script lang="ts">
export default {
	data() {
		return {
			showOverlay: false, // Contrôle la visibilité de l'overlay
			text: 'Contenu du texte centré ici',
		};
	},
};
</script>

<style scoped>
.countdown-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 9998;
	display: flex;
	justify-content: center;
	align-items: center;
}

.countdown-card {
	background-color: #fff;
	text-align: center;
	font-size: 5rem;
	color: #333;
	z-index: 9999;
}
</style>

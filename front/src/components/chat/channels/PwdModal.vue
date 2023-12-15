<template>
	<v-dialog v-model="dialog" max-width="500px">
		<v-card>
			<v-card-title>
				<span class="headline">This channel is private</span>
			</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="password"
					label="Password"
					type="password"
					max-length="20"
					outlined
				></v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" @click="submit">Valider</v-btn>
				<v-btn color="error" @click="cancel">Annuler</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
export default {
	data() {
		return {
			dialog: false,
			password: '',
		};
	},
	methods: {
		submit() {
			// Logique de validation du mot de passe ici
			console.log('Mot de passe saisi :', this.password);
			this.dialog = false;
		},
		cancel() {
			this.dialog = false;
		},
	},
};
</script>

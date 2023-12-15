<template>
	<v-row v-if="showModal">
		<v-dialog
			v-model="dialog"
			@click:outside="cancel"
			>
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
						@keyup.enter="submit"
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" @click="submit">Valider</v-btn>
					<v-btn color="error" @click="cancel">Annuler</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
export default {
	props: {
		showModal: Boolean,
	},
	data() {
		return {
			dialog: this.showModal,
			password: '' as string,
		};
	},
	emits: ['join-private-channel', 'close-modal'],
	methods: {
		submit() {
			console.log('Mot de passe saisi :', this.password);
			this.dialog = false;
			this.$emit('join-private-channel', this.password);
		},
		cancel() {
			this.dialog = false;
			this.$emit('close-modal');
		},
	},
};
</script>

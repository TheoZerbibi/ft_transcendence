<template>
		<v-dialog v-if="showModal" class="align-center justify-center"
			v-model="dialog"
			@click:outside="cancel"
			>
				<v-card-title>
					<span class="headline">What name will you choose ?</span>
				</v-card-title>
				<v-card-text>
					<v-text-field
						v-model="name"
						label="Name"
						type="name"
						max-length="20"
						outlined
						@keyup.enter="submit"
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" @click="submit">OK</v-btn>
					<v-btn color="error" @click="cancel">Cancel</v-btn>
				</v-card-actions>
		</v-dialog>
</template>

<script lang="ts">
export default {
	props: {
		showModal: Boolean,
	},
	data() {
		return {
			dialog: this.showModal as boolean,
			name: '' as string,
		};
	},
	emits: ['create-channel', 'close-modal'],
	methods: {
		submit() {
			this.dialog = false;
			this.$emit('create-channel', this.name);
		},
		cancel() {
			this.dialog = false;
			this.$emit('close-modal');
		},
	},
};
</script>

<template>
	<v-dialog v-if="showModal" class="align-center justify-center" v-model="dialog" @click:outside="cancel">
		<v-card>
			<v-card-title>
				<span class="headline">This channel is private</span>
			</v-card-title>
			<v-card-text>
				<v-text-field
					v-model="password"
					placeholder="Password"
					max-length="20"
					variant="outlined"
					rounded="0" 
					flat
					label="Password"
					type="password"
					@keyup.enter="submit">
				</v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn flat
					rounded="0"
					style="border: black solid thin;"
					:ripple="false"
					color="primary"
					@click="submit">OK
				</v-btn>
				<v-btn flat
					rounded="0"
					style="border: black solid thin;"
					:ripple="false"
					color="error"
					@click="cancel">Cancel
				</v-btn>
			</v-card-actions>
		</v-card>
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
			password: '' as string,
		};
	},
	emits: ['join-private-channel', 'close-modal'],
	methods: {
		submit() {
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

<style scoped>
.v-card {
	border: black solid thin;
	border-radius: 0;
	scroll-behavior: auto;
	overflow-y: scroll;
	overflow-x: hidden;
	height: 20dvh;
	width: 20dvw;
}

.v-btn {
	border: black solid thin;
	width: 100%;
	margin-top: 1dvh;
	margin-bottom: 1dvh;
	display: flex;
	position: relative;
}
</style>

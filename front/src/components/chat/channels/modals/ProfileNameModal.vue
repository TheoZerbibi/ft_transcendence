<template>
	<v-dialog v-if="showModal" v-model="dialog" @click:outside="cancel">
		<v-card class="rounded-0">
			
			<v-card-title>
				<span class="headline">What name will you choose ?</span>
			</v-card-title>
			
			<v-card-text>
				<v-text-field 
					rounded="0"
					flat
					density="compact"
					clearable
					v-model="name"
					label="Name"
					type="name"
					variant="outlined"
					@keyup.enter="submit">
				</v-text-field>
			</v-card-text>

			<v-card-actions class="d-flex align-center justify-center">
				<v-btn flat rounded="0" :ripple="false" @click="cancel">Cancel</v-btn>
				<v-btn flat rounded="0" :ripple="false" @click="submit">OK</v-btn>
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
			name: '' as string,
		};
	},
	watch: {
		showModal: function (val: boolean) {
			this.dialog = val;
		},
	},
	emits: ['change-dname', 'close-modal'],
	methods: {
		submit() {
			this.dialog = false;
			this.$emit('change-dname', this.name);
		},
		cancel() {
			this.dialog = false;
			this.$emit('close-modal');
		},
	},
};
</script>

<style scoped>

.v-btn {
	border: black solid thin;
	width: 45%;
	margin-top: 1dvh;
	margin-bottom: 1dvh;
	display: flex;
	position: relative;
}

</style>
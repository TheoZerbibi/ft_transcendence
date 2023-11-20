<template>
	<v-row justify="center">
		<v-dialog v-model="dialog" persistent width="800">
			<template #activator="{ props }">
				<v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
			</template>
			<v-card>
				<v-card-title>
					<span class="text-h5">Exemple</span>
				</v-card-title>
				<v-card-text> bsoir </v-card-text>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
export default {
	data() {
		return {
			dialog: false,
		};
	},
};
</script>

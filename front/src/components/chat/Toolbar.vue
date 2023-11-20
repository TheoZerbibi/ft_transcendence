<template>
  <div class="Toolbar">
	<v-app-bar>
		<v-responsive max-width="156">
			<v-text-field
				bg-color="grey-lighten-1"
				density="compact"
				flat
				hide-details
				rounded="pill"
				variant="solo-filled"
			></v-text-field>
		</v-responsive>
	</v-app-bar>
  </div>
</template>

<script>

export default {
  name: 'Toolbar',
  date() {
	return {
	  // Données spécifiques à la toolbar
	};
  },
  methods: {
	// Autres méthodes spécifiques à la toolbar
  },
  // ...
};
</script>

<style scoped>
/* Styles pour Toolbar */
</style>

<template>
  <div class="message-input">
	<v-footer app height="72">
		<v-text-field
			bg-color="grey-lighten-1"
			class="overflow-hidden"
			density="compact"
			flat
			hide-details
			rounded="pill"
			variant="solo-filled"
		></v-text-field>
	</v-footer>
  </div>
</template>

<script>
export default {
  name: 'MessageInput',
  // ...
};
</script>

<style scoped>
/* Styles pour MessageInput */
</style>

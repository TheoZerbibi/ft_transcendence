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
				@keydown.enter="sendMessage"
			></v-text-field>
		</v-footer>
	</div>
</template>

<script>
export default {
	name: 'MessageInput',
	methods: {
		sendMessage() {
			// Perform fetch request with customized URL
			fetch('http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel//message')
				.then(response => {
					// Handle response
				})
				.catch(error => {
					// Handle error
				});
		}
	}
};
</script>

<style scoped>
/* Styles pour MessageInput */
</style>

<!-- RedirectionPage.vue -->

<script>
export default {
	async created() {
		try {
			const token = this.$route.query.token;
			if (token) {
				// Call an API endpoint to verify the token and fetch user details
				const response = await this.$axios.post('/api/auth/verify', { token });
				const user = response.data;

				if (user) {
					// Check if the user exists in the Prisma database
					const userExists = await this.$axios.get(`/api/users/${user.userId}`);

					if (userExists.data.exists) {
						// User exists, redirect to homepage
						this.$router.push('/');
					} else {
						// User does not exist, redirect to onboarding page
						this.$router.push('/onboarding');
					}
				} else {
					// Handle error: Invalid token or user not found
					console.error('Invalid token or user not found');
					this.$router.push('/error');
				}
			} else {
				// Handle error: Token not provided
				console.error('Token not provided');
				this.$router.push('/error');
			}
		} catch (error) {
			console.error('Error during redirection:', error);
			this.$router.push('/error');
		}
	},
};
</script>

<template>
	<div>
		<h2>Redirection Page</h2>
		<p>Loading...</p>
	</div>
</template>

<style scoped>
/* Add your component-specific styles here */
h2 {
	color: #333;
}
</style>

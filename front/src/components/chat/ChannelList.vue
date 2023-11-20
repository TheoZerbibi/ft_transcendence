<template>
	<v-navigation-drawer width="244">
		<v-sheet color="grey-lighten-5" height="128" width="100%"></v-sheet>

		<v-list>
			<v-list-item v-for="n in 5" :key="n" :title="`Item ${n}`" link></v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>

export default {
  name: 'ChannelList',
	data() {
		return {
			channels: [], // pour stocker les channels
		};
	},
	/* async fetchChannels() {
		try {
			const response = await fetch(
				`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/joined`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${JWT}`,
						'Access-Control-Allow-Origin': '*',
					},
				}
			);
		} catch (error) {
			console.error(error);
		}
	},
	mounted() {},
	methods: {} */

  // ...
};
</script>

<style scoped>
/* Styles pour ChannelList */
</style>

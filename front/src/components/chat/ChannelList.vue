<template>
	<v-navigation-drawer width="244">
		<v-sheet color="grey-lighten-5" height="128" width="100%"></v-sheet>

		<v-list>
			<v-list-item v-for="channel in channels" :key="channel.updated_at" :title="channel.name" link></v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'ChannelList',
	data() {
		return {
			channels: [], // to store the channels
		};
	},
	beforeMount() {
		this.fetchChannels();
	},
	mounted() {},
	methods: {
		async fetchChannels() {
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
			if (response.ok) {
				const data = await response.json();
				this.channels = data; // store the response in channels
				console.log(channels);
			} else {
				console.error('Failed to fetch channels');
			}
		} catch (error) {
			console.error(error);
		}
	},	
	}
};
</script>

<style scoped>
/* Styles pour ChannelList */
</style>

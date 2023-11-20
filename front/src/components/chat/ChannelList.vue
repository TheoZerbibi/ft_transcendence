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
	
};
</script>

<style scoped>
/* Styles pour ChannelList */
</style>

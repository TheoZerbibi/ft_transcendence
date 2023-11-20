<template>
	<v-navigation-drawer location="right">
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
			// Données spécifiques à la ChannelList
		};
	},
	methods: {
		selectChannel(channel) {
			// Gestion du choix d'un canal
		},
		// Autres méthodes spécifiques à la ChannelList
	},
	// ...
};
</script>
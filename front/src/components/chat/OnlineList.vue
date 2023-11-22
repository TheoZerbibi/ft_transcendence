<template>
	<v-list>
		<template v-for="item in getListItems()" :key="item">
			<v-list-item :title="item" link></v-list-item>
		</template>
	</v-list>
</template>

<script lang="ts">
export default {
	name: 'ChannelsList',
	methods: {
		getListItems() {
			const items = [];
			for (let n = 1; n <= 5; n++) {
				items.push(`Item ${n}`);
			}
			return items;
		},
	},
};
</script>

<style scoped>
</style>
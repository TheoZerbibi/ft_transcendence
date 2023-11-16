<template>
	<component :is="getComponent" />
</template>

<script lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
	name: 'TeamProfile',
	data() {
		return {
			login: null as string | null,
		};
	},
	computed: {
		getComponent() {
			const componentsMapping = {
				grannou: defineAsyncComponent(() => import('../components/team/GrannouProfile.vue')),
				thzeribi: defineAsyncComponent(() => import('../components/team/ThzeribiProfile.vue')),
			};
			return componentsMapping[this.login as keyof typeof componentsMapping] || null;
		},
	},
	beforeMount() {
		const route = useRoute();
		this.login = route.params.login;
	},
};
</script>

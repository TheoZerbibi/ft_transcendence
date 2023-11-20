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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
				seozcan: defineAsyncComponent(() => import('../components/team/SeozcanProfile.vue')),
				thzeribi: defineAsyncComponent(() => import('../components/team/ThzeribiProfile.vue')),
				nfauconn: defineAsyncComponent(() => import('../components/team/NfauconnProfile.vue')),
=======
				thzeribi: defineAsyncComponent(() => import('../components/team/SeozcanProfile.vue')),
				thzeribi: defineAsyncComponent(() => import('../components/team/ThzeribiProfile.vue')),
				thzeribi: defineAsyncComponent(() => import('../components/team/IguidadoProfile.vue')),
				thzeribi: defineAsyncComponent(() => import('../components/team/NfauconnProfile.vue')),
>>>>>>> 2e60013 (just vuetify icon works)
=======
				seozcan: defineAsyncComponent(() => import('../components/team/SeozcanProfile.vue')),
				thzeribi: defineAsyncComponent(() => import('../components/team/ThzeribiProfile.vue')),
				nfauconn: defineAsyncComponent(() => import('../components/team/NfauconnProfile.vue')),
>>>>>>> 2852cf3 (isma out)
				grannou: defineAsyncComponent(() => import('../components/team/GrannouProfile.vue')),
=======
				grannou: defineAsyncComponent(() => import('../components/team/GrannouProfile.vue')),
				thzeribi: defineAsyncComponent(() => import('../components/team/ThzeribiProfile.vue')),
>>>>>>> c80165e (fix: github issue)
			};
			return componentsMapping[this.login as keyof typeof componentsMapping] || null;
		},
	},
	beforeMount() {
		const route = useRoute();
		this.login = route.params.login;
	},
<<<<<<< HEAD
=======
	mounted() {
		console.log(this.login);
	},
>>>>>>> c80165e (fix: github issue)
};
</script>

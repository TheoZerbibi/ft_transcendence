<template>
	<v-container 
		class="
			d-flex
			flex-column
			justify-space-evenly"
		fill-height
	>

		<v-row>
			<v-col v-for="k in 1" :key="k" cols="12" class="d-flex align-center justify-center">
				<v-sheet 
					id="omorisPlace"
					class="order-0 pa-2 ma-2"
					height="80dvh"
					width="90dvh" />
			</v-col>
		</v-row>

		<v-row justify="end" >
			<v-col v-for="k in 1" :key="k" cols="2" class="d-flex align-center justify-center">
				<v-sheet 
					id="doorLogout"
					class="order-1 pa-2 ma-2"
					height="10dvh"
					width="6dvh" />
			</v-col>
		</v-row>

	</v-container>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useUser } from '../stores/user';
import { computed } from 'vue';

const userStore = useUser();

export default defineComponent({
	name: 'Home',
	components: {},
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	async beforeMount() {
		const token = this.$cookies.get('token');
		if (!this.JWT || token) {
			if (token) {
				this.$cookies.remove('token');
				try {
					await userStore.setJWT(token);
				} catch (err) {
					return this.$router.push({ name: `Login` });
				}
			} else return this.$router.push({ name: `Login` });
		}
	},
});
</script>

<style scoped>

#omorisPlace {
	background: url('/public/dashboard/omorisPlace.png');
	object-fit: cover;
	object-position: center;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	aspect-ratio: 1;
	z-index: 2;
}

#doorLogout {
	background: url('/public/dashboard/clickable/doorClosed.png');
	object-fit: cover;
	object-position: center;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	aspect-ratio: 1;
	z-index: 2;
}

</style>

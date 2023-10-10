<template>
	<v-app id="home">
		<NavBar>
			<v-container fluid>

			</v-container>
		</NavBar>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import NavBar from '../components/utils/NavBar.vue';

export default defineComponent({
	name: 'Home',

	components: {
		NavBar	
	},
});
</script>

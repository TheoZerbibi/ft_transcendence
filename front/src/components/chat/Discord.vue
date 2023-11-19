<template>
	<v-app id="inspire">
		<v-system-bar>
			<v-spacer></v-spacer>

			<v-icon>mdi-account</v-icon>

			<v-icon>mdi-circle</v-icon>

			<v-icon>mdi-triangle</v-icon>
		</v-system-bar>

		<Sidebar></Sidebar>

		<v-app-bar class="px-3" color="grey-lighten-4" flat height="72">
			<v-spacer></v-spacer>

			<v-responsive max-width="156">
				<v-text-field
					bg-color="grey-lighten-1"
					density="compact"
					flat
					hide-details
					rounded="pill"
					variant="solo-filled"
				></v-text-field>
			</v-responsive>
		</v-app-bar>

		<v-main><!--  --></v-main>

		<v-navigation-drawer location="right">
			<v-list>
				<v-list-item v-for="n in 5" :key="n" :title="`Item ${n}`" link></v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-footer app height="72">
			<v-text-field
				bg-color="grey-lighten-1"
				class="overflow-hidden"
				density="compact"
				flat
				hide-details
				rounded="pill"
				variant="solo-filled"
			></v-text-field>
		</v-footer>
	</v-app>
</template>

<script>
import { Sidebar } from "./Sidebar.vue";

export default {
	name: "Chat",
	components: {
		Sidebar,
	},
};
</script>
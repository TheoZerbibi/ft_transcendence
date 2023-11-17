
<template>
	<v-app>
		<v-layout class="rounded rounded-md">
			<v-app-bar :border="true" rounded-pill title="ft_transcendence">
				<template #append>
					<v-spacer />
					<v-btn to="/">Home</v-btn>
					<v-btn to="/auth/signup">Login</v-btn>
				</template>
			</v-app-bar>
			<v-main class="d-flex align-center justify-center" style="min-height: 300px;">
				<router-view />
			</v-main>
		</v-layout>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'App',
	data() {
		return {};
	},
});
</script>

<style scoped>

h1 {
	color: #b8b8b8;
}
v-btn {
	padding: 0.5rem;
	padding-left: 1rem;
	padding-right: 1rem;
	background-color: #000000;
	color: white;
	border: none;
	cursor: pointer;
	border-radius: 0.4rem;
	margin: 2rem;
	vertical-align: middle;
}
v-btn:hover {
	filter: invert(1);
}
</style>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0bc9e74 (chore: Fix conflict)
<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
<<<<<<< HEAD
=======

<template>
	<v-app :style="{ backgroundColor: color }">
=======

<template>
	<v-app>
>>>>>>> 0a0071c (chore: revert app)
		<v-layout class="rounded rounded-md">
			<v-app-bar :border="true" rounded-pill title="ft_transcendence">
				<template #append>
					<v-spacer />
<<<<<<< HEAD
					<v-btn text to="/">Home</v-btn>
					<v-btn text to="/auth/signup">Login</v-btn>
=======
					<v-btn to="/">Home</v-btn>
					<v-btn to="/auth/signup">Login</v-btn>
>>>>>>> 0a0071c (chore: revert app)
				</template>
			</v-app-bar>
			<v-main>
				<router-view />
			</v-main>
		</v-layout>
<<<<<<< HEAD
>>>>>>> c80165e (fix: github issue)
=======
>>>>>>> 0bc9e74 (chore: Fix conflict)
=======
>>>>>>> 0a0071c (chore: revert app)
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'App',
	data() {
<<<<<<< HEAD
		return {};
	},
});
</script>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 8f38e0e (chore: Fix linter error)
=======
		return {
			color: '#555555',
		};
	},
});
</script>
=======
>>>>>>> 0a0071c (chore: revert app)

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
<<<<<<< HEAD
>>>>>>> c80165e (fix: github issue)
=======
>>>>>>> 0bc9e74 (chore: Fix conflict)
=======
>>>>>>> 0a0071c (chore: revert app)

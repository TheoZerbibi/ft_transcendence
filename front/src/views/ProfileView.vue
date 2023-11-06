<template>
	<header>
		<h1 class="neonPolice" color=ẅhite>This is the profile page</h1>
	</header>
	<main>
		<section>
			<v-container class="profileHome">
				<v-card>
					<v-btn class="neonPolice" @click="$router.push('chat')">Chat &#129418;</v-btn>
				</v-card>
				<v-card class="insideBox01">Card 1</v-card>
				<v-card class="insideBox02">Card 2</v-card>
				<v-card class="insideBox03">Card 3</v-card>
			</v-container>
		</section>
	</main>
	<nav>
		<p>This is a navbar to display after authentification, vertically left better?</p>
		<!--Cf ul and li balises-->
	</nav>
	<aside>
		<p>This is an aside section</p>
	</aside>
	<footer>
		<p>This is a footer</p>
		<a href="https://www.instagram.com" target="_blank">Instagram </a>
		<a href="https://www.facebook.com" target="_blank">Facebook </a>
		<a href="https://www.twitter.com" target="_blank">Twitter </a>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
});
</script>

<style scoped>
.profileHome{
	display:flex;
	flex-direction: row;
	justify-content: space-around;
	height: 600px;
	align-items: center;
	gap: 10px;
}

.insideBox01 {
	order: 1;
}

.insideBox02 {
	order: 2;
}

.insideBox03 {
	order: 3;
}

</style>

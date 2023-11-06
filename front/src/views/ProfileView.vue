<template>
	<header>
		<h1>This is the profile page</h1>
		<v-btn class="neonPolice" @click="$router.push('chat')">Chat &#129418;</v-btn>
	</header>
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
.homepage {
	display: flex;
	align-items: center;
	flex-direction: column;
	background: linear-gradient(90deg, #8360c3, #2ebf91);
}

.title {
	display: flex;
	align-items: flex-start;
	margin: 20px;
	padding: 20px;
}

.teamLeader {
	font-weight: bold;
	color: darkmagenta;
}

#authButton:hover {
	/* box-shadow: 6px 6px 0px rgba(0, 0, 0);  Button with shadow non gradient*/
	box-shadow: 6px 6px 25px rgba(0, 0, 0, 0.5);
	border: double;
}

.auth:hover {
	color: darkmagenta;
}
</style>

<script></script>

<style></style>

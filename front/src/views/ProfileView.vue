<template>
	<header>
		<h1 class="neonPolice" color=ẅhite>This is the profile page</h1>
	</header>
	<nav>
		<p>This is a navbar to display after authentification, vertically left better?</p>
		<!--Cf ul and li balises-->
	</nav>
	<main>
		<section>
			<v-container class="profileHome">
				<div class="box zero">
					<v-btn class="chatButtom neonPolice" @click="$router.push('chat')">Chat &#128062;</v-btn>
				</div>
				<div class="box one">Box 1 &#128001</div>
				<div class="box two">Box 2 &#128048</div>
				<div class="box three">Box 3 &#129418</div>
				<div class="box four">Box 4 &#128013</div>
				<div class="box five">Box 5 &#128014</div>
				<div class="box six">Box 6 &#128025</div>
				<div class="box seven">Box 7 &#128029</div>
				<div class="box eight">Box 8 &#128030</div>
				<div class="box nine">Box 9 &#128060</div>

			</v-container>
		</section>
	</main>
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
	display:grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 100px 100px 100px 100px 100px;
	gap: 10px;
}

.box {
	background-color: darkgreen;
	display: flex;
	align-items: center;
	justify-content: center;
}
.zero {
	grid-column: 1 / 2;
	grid-row: 1 / 6;
}
.one {
	grid-column: 2 / 7;
}
.two {
	/* grid-column: 2 / 3; */
	grid-row: 2 / 4;
}
.three {
	grid-column: 3 / 4;
}
.four {
	grid-column: 4 / 7;
}
.five {
	grid-column: 3 / 7;
}
.six {
	grid-column: 2 / 4;
}
.seven {
	grid-column: 4 / 7;
	background-color: green;
}
.eight {
	grid-column: 2 / 3;
	background-color: green;
}
.nine {
	grid-column: 3 / 7;
	background-color: green;
}

@media screen and (max-width: 960px) {
	.profileHome {
		flex-direction: column;
	}

	/* .box { */
		/* overflow: auto; */
	/* } */
}

</style>


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
				<!-- <div class="¨boxZero"> -->
					<v-btn class="boxZero neonPolice" @click="$router.push('chat')">Chat &#128062;</v-btn>
				<!-- </div> -->
				<div class="boxOne">Box 1 &#128001</div>
				<div class="boxTwo">Box 2 &#128048</div>
				<div class="boxThree">Box 3 &#129418</div>
				<div class="boxFour">Box 4 &#128013</div>
				<div class="boxFive">Box 5 &#128014</div>
				<div class="boxSix">Box 6 &#128025</div>
				<div class="boxSeven">Box 7 &#128029</div>
				<div class="boxEight">Box 8 &#128030</div>
				<div class="boxNine">Box 9 &#128060</div>

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
	/* grid-template-columns: 250px 250px 250px 250px; */
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	/* grid-template-rows: 150px 300px; */
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
	align-items: center;
	gap: 10px;
}
.box {
	margin:auto;
}

.boxZero {
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 1;
	grid-row-end: 6;
}
.boxOne {
	grid-column-start: 1;
	grid-column-end: 7;
}
.boxTwo {
	grid-column-start: 1;
	grid-column-end: 2;
}
.boxThree {
	grid-column-start: 2;
	grid-column-end: 4;
}
.boxFour {
	grid-column-start: 4;
	grid-column-end: 6;
}
.boxFive {
	grid-column-start: 2;
	grid-column-end: 6;
}
.boxSix {
	grid-column-start: 1;
	grid-column-end: 4;
}
.boxSeven {
	grid-column-start: 4;
	grid-column-end: 6;
}
.boxEight {
	grid-column-start: 1;
	grid-column-end: 3;
}
.boxNine {
	grid-column-start: 3;
	grid-column-end: 6;
}


</style>

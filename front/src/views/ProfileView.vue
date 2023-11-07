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
			<v-container class="profileHome neonPolice">
				<div class="box one">Settings &#128001
					<v-btn class="neonPolice">About ℹ️</v-btn>
					<v-btn class="neonPolice">Rules 📄</v-btn>
					<v-btn class="neonPolice">Help ❓</v-btn>
				</div>
				<div class="box two">User infos &#128048
					<div>Profile picture</div>
					<div>name 1</div>
					<div>does not display</div>
					<div>username</div>
				</div>
				<div class="box three">Empty &#129418</div>
				<div class="box four">Buttons &#128013
					<v-btn class="neonPolice">Modify 🖋</v-btn>
					<v-btn class="neonPolice">Logout 🚪</v-btn>
				</div>
				<div class="box five">Game stats &#128014
					<div></div>
					<div></div>
				</div>
				<div class="box six">
					<v-btn class="chatButtom neonPolice" @click="$router.push('chat')">Chat &#128062;</v-btn>
				</div>
/				<div class="box seven">Security &#128029
					<v-btn class="neonPolice">Enable 2FA</v-btn>
				</div>
				<div class="box eight">Privacy &#128030
					<v-btn class="neonPolice">Delete account ❌</v-btn>
				</div>
				<div class="box nine">Match history &#128060</div>
				<div class="box ten">
					<v-btn class="chatButtom neonPolice" @click="$router.push('chat')">Play ▶️ &#129513;</v-btn>
				</div>

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
	grid-template-rows: 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px;
	gap: 10px;
}

.box {
	background-color: darkgreen;
	/* display: flex; */
	/* align-items: center; */
}
.one {
	grid-row: 1 / 8;
	display: block;
}
.two {
	/* grid-column: 2 / 3; */
	grid-row: 1 / 6;
	display: block;
}
.three {
	grid-row: 1 / 6;
}
.four {
	grid-row: 1 / 6;
	display: block;
}
.five {
	grid-column: 2 / 5;
	grid-row: 6 / 9;
	display: block;
}
.six {
	grid-row: 8 / 10;
}
.seven {
	grid-row: 10 / 11;
}
.eight {
	grid-row: 11 / 12;
}
.nine {
	grid-column: 2 / 4;
	grid-row: 9 / 12;
}
.ten {
	grid-column: 4 / 5;;
	grid-row: 9 / 12;
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


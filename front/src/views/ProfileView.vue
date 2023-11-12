<template>
	<header>
		<h1 class="neonPolice">This is the profile page</h1>
	</header>
	<main>
		<section>
			<v-container class="profileHome neonPolice">
				<div class="box one">Settings &#128001
					<link rel="icon" href="/favicon.ico">
					<v-btn>About ℹ️</v-btn>
					<v-btn>Rules 📄</v-btn>
					<v-btn>Help ❓</v-btn>
				</div>
				<div class="box two">User infos &#128048
					<div>Profile picture</div>
					<div>name 1</div>
					<div>does not display</div>
					<div>username</div>
				</div>
				<div class="box three">Empty &#129418</div>
				<div class="box four">Buttons &#128013
					<v-btn>Modify 🖋</v-btn>
					<v-btn>Logout 🚪</v-btn>
				</div>
				<div class="box five">Game stats &#128014
					<div></div>
					<div></div>
				</div>
				<div class="box six">
					<v-btn class="chatButtom" @click="$router.push('chat')">Chat &#128062;</v-btn>
				</div>
/				<div class="box seven">Security &#128029
					<v-btn>Enable 2FA &#128506</v-btn>
				</div>
				<div class="box eight">Privacy &#128030
					<v-btn>Delete account ❌</v-btn>
				</div>
				<div class="box nine">Match history &#128060</div>
				<div class="box ten">
					<v-btn class="chatButtom" @click="$router.push('chat')">Play ▶️ &#129513;</v-btn>
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
	grid-template-rows: 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px;
	gap: 10px;
}

.box {
	background-color: darkgreen;
	/* display: flex; */
	/* align-items: center; */
}
.one {
	grid-row: 1 / 6;
	display: block;
}
.two {
	grid-row: 1 / 5;
	display: block;
}
.three {
	grid-row: 1 / 5;
}
.four {
	grid-row: 1 / 5;
	display: block;
}
.five {
	grid-column: 2 / 5;
	grid-row: 5 / 8;
	display: block;
}
.six {
	grid-row: 6 / 8;
}
.seven {
	grid-row: 8 / 10;
}
.eight {
	grid-row: 10 / 12;
}
.nine {
	grid-column: 2 / 4;
	grid-row: 8 / 12;
}
.ten {
	grid-column: 4 / 5;;
	grid-row: 8 / 12;
}

@media screen and (max-width: 960px) {
	.profileHome {
		flex-direction: column;
	}
}
</style>


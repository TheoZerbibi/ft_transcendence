<template>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	<main>
		<section>
			<v-container class="profileHome neonPolice">
				<div class="box one">Settings &#128001
					<link rel="icon" href="/favicon.ico">
					<v-btn class="customButton darkNeonPolice" rounded>About ℹ️</v-btn>
					<v-btn class="customButton darkNeonPolice" rounded>Rules 📄</v-btn>
					<v-btn class="customButton darkNeonPolice" rounded>Help ❓</v-btn>
				</div>
				<div class="box two">User infos &#128048
					<div>Profile picture</div>
					<div>name 1</div>
					<div>does not display username</div>
				</div>
				<div class="box three">&#129418</div>
				<div class="box four">
					<v-btn class="customButton darkNeonPolice" rounded>Modify 🖋</v-btn>
					<v-btn class="customButton darkNeonPolice" rounded>Logout 🚪</v-btn>
				</div>
				<div class="box five">Game stats &#128014
					<div></div>
					<div></div>
				</div>
				<div class="box six">
					<v-btn class="customButton darkNeonPolice" rounded @click="$router.push('chat')">Chat &#128062;</v-btn>
				</div>
				<div class="box seven">Security &#128029
					<v-btn class="customButton darkNeonPolice" rounded>Enable 2FA &#128506</v-btn>
				</div>
				<div class="box eight">Privacy &#128030
					<v-btn class="customButton darkNeonPolice" rounded>Delete account ❌</v-btn>
				</div>
				<div class="box nine">Match history &#128060</div>
				<div class="box ten">
					<v-btn class="customButton darkNeonPolice" rounded @click="$router.push('chat')">Play ▶️ &#129513;</v-btn>
				</div>

			</v-container>
		</section>
	</main>
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
	/* background: url(/src/assets/OmoriWallpapers/OmoriJournal01.png); */

}

.box {
	background-color: darkgreen;
	/* background: url(/src/assets/OmoriWallpapers/OmoriJournal01.png) no-repeat; */
	background-size: cover;
	display: flex;
    flex-direction: column;
    align-items: center; /* Align buttons to the bottom */
	justify-content: space-between; /* Align items to the bottom */

}
.one {
	grid-row: 1 / 6;
	background: url(/src/assets/OmoriPictures/Omori443.jpg) center no-repeat;
	background-size: cover;
}

.customButton {
	display: flex;
    align-items: center;
    min-width: auto;
    padding-left: 20px;
  }

.two {
	grid-row: 1 / 5;
	background: url(/src/assets/OmoriPictures/Omori228.jpg) center no-repeat;
	background-size: cover;

}
.three {
	grid-row: 1 / 5;
	background: url(/src/assets/OmoriPictures/Omori244.jpg) center no-repeat;
	background-size: cover;
}
.four {
	grid-row: 1 / 5;
	background: url(/src/assets/OmoriPictures/Omori277.jpg) center no-repeat;
	background-size: cover;
}
.five {
	grid-column: 2 / 5;
	grid-row: 5 / 8;
	background: url(/src/assets/OmoriPictures/Omori416.jpg) center no-repeat;
	background-size: cover;
}
.six {
	grid-row: 6 / 8;
	background: url(/src/assets/OmoriWallpapers/OmoriJournal02.png) center no-repeat;
	background-size: cover;
}
.seven {
	grid-row: 8 / 10;
	background: url(/src/assets/OmoriPictures/Omori361.jpg) center no-repeat;
	background-size: cover;
}
.eight {
	grid-row: 10 / 12;
	background: url(/src/assets/OmoriPictures/Omori355.jpg) center no-repeat;
	background-size: cover;
}
.nine {
	grid-column: 2 / 4;
	grid-row: 8 / 12;
	background: url(/src/assets/OmoriPictures/Omori358.jpg) center no-repeat;
	background-size: cover;
}
.ten {
	grid-column: 4 / 5;;
	grid-row: 8 / 12;
	background: url(/src/assets/OmoriPictures/Omori409.jpg) center no-repeat;
	background-size: cover;
}

@media screen and (max-width: 960px) {
	.profileHome {
		flex-direction: column;
	}
}
</style>

=======
    <h1> This is the profile page</h1>    

=======
    <div>
        <h1> This is the profile page</h1>    
        <v-btn class="neonPolice" @click="$router.push('chat')">Chat &#129418;</v-btn>
    </div>
    
>>>>>>> 2e60013 (just vuetify icon works)
=======
	<div>
		<h1>This is the profile page</h1>
		<v-btn class="neonPolice" @click="$router.push('chat')">Chat &#129418;</v-btn>
	</div>
>>>>>>> 3b9f6f4 (clean files)
=======
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
>>>>>>> dd686cf (prototype profile page)
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

<<<<<<< HEAD
<<<<<<< HEAD
<style></style>
>>>>>>> 7f206e2 (profile route created)
=======
<style>
</style>
>>>>>>> 2e60013 (just vuetify icon works)
=======
<style></style>
>>>>>>> 3b9f6f4 (clean files)

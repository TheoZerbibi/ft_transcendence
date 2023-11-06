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
>>>>>>> dd686cf (prototype profile page)
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
<<<<<<< HEAD

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
=======
>>>>>>> 4790b5f (container boxes prottotype in profile page)

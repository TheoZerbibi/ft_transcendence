<template>
	<main class="pageBackground"
		:style="{
			backgroundImage: `url(/ui/OmoriBedroom.png)`,
			backgroundPosition: 'center center',
			backgroundSize: 'cover',
		}"
	>
		<!-- <v-container class="gridContainer"> -->
		<!-- <div class="box one"> -->
		<!-- <link rel="icon" href="/favicon.ico" /> -->
		<!-- </div> -->
		<!-- <div class="box two"> -->
		<!-- </div> -->
		<!-- <div class="box three"></div> -->
		<!-- <div class="box four"> -->
		<!-- <v-btn class="omoriButton omoriPolice">Modify</v-btn> -->
		<!-- <v-btn class="omoriButton omoriPolice">Logout</v-btn> -->
		<!-- </div> -->
		<!-- <div class="box five"> -->
		<!-- <div></div> -->
		<!-- <div></div> -->
		<!-- </div> -->
		<!-- <div class="box six"> -->
		<!-- <v-btn class="omoriButton omoriPolice" @click="$router.push('chat')" -->
		<!-- >Chat</v-btn -->
		<!-- > -->
		<!-- </div> -->
		<!-- <div class="box seven"> -->
		<!-- <v-btn class="omoriButton omoriPolice">Enable 2FA</v-btn> -->
		<!-- </div> -->
		<!-- <div class="box eight"> -->
		<!-- <v-btn class="omoriButton omoriPolice">Delete account</v-btn> -->
		<!-- </div> -->
		<!-- <div class="box nine"></div> -->
		<!-- <div class="box ten"> -->
		<!-- <br /> -->
		<!-- <br /> -->
		<!-- <v-btn class="omoriButton omoriPolice" @click="$router.push('chat')" -->
		<!-- >Play</v-btn -->
		<!-- > -->
		<!-- </div> -->
		<!-- <div class ="box eleven"></div> -->
		<!-- <div class ="box twelve"></div> -->
		<!-- <div class ="box thirteen"></div> -->
		<!-- <div class ="box fourteen"></div> -->
		<!-- <div class ="box fifteen"></div> -->
		<!-- <div class ="box sixteen"></div> -->
		<!-- <div class ="box seventeen"></div> -->
		<!-- <div class ="box eighteen"></div> -->
		<!-- <div class ="box nineteen"></div> -->
		<!-- <div class ="box twenty"></div> -->
		<!-- <div class ="box twentyone"></div> -->
		<!-- <div class ="box twentytwo"></div> -->
		<!-- <div class ="box twentythree"></div> -->
		<!-- <div class ="box twentyfour"></div> -->
		<!-- </v-container> -->
		<a href="https://bibliotheques.paris.fr/" target="_blank" class="clickable-area link1"></a>
		<a href="page2.html" class="clickable-area link2"></a>
	</main>
</template>

<script lang="ts">
import { useUser } from '../stores/user';
import { computed, defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
	setup() {
		const userStore = useUser();
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	beforeMount() {
		if (!this.JWT || !this.user) {
			return this.$router.push({ name: `Login` });
		}
	},
});
</script>

<style scoped>
a:hover {
	cursor: url(https://www.omori-game.com/img/cursor/cursor.png), auto;
}
.pageBackground {
	margin: 0;
	align-items: center;
	justify-content: center;
	background-color: black;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vw;
	z-index: -1;
}

.clickable-area {
	position: absolute;
	cursor: pointer;
}
.link1 {
	top: 10%;
	left: 5%;
	width: 10%;
	height: 20%;
	/* Background color pour montrer la zone cliquable, vous pouvez le supprimer */
	background-color: rgba(255, 0, 0, 0.3);
}
.link2 {
	top: 10%;
	left: 17%;
	width: 10%;
	height: 15%;
	/* Background color pour montrer la zone cliquable, vous pouvez le supprimer */
	background-color: rgba(0, 0, 255, 0.3);
}

.gridContainer {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(13, 60px);
	gap: 10px;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.omoriButton {
	max-width: 4.5rem;
	padding: 0.25rem 0.125rem;
	position: relative;
	top: 0px;
	flex: 0 0 calc(25% - 15px);
	--tw-bg-opacity: 1;
	background-color: rgb(0 0 0 / var(--tw-bg-opacity));
	--tw-text-opacity: 1;
	color: rgb(255 255 255 / var(--tw-text-opacity));
	box-shadow:
		inset 0 0 0 1px #000,
		inset 0 0 0 3px #fff;
	text-transform: uppercase;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
	-moz-tap-highlight-color: transparent;
	-webkit-tap-highlight-color: transparent;
	cursor: url(/img/cursor/cursor.png), auto;
}
/*  */
.site-footer__info > :not([hidden]) ~ :not([hidden]) {
	--tw-space-x-reverse: 0;
	margin-right: calc(0.25rem * var(--tw-space-x-reverse));
	margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
/*  */
.box {
	background-color: white;
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	opacity: 0.3;
	/*  */
	/* Create border with color radiant */
	/* border: 2px solid #333; */
	/* text-align: center; */
	/* border: 5px solid transparent; */
	/* border-image: linear-gradient(to right, #470979, #00d4ff) 5 repeat; */
}
.one {
	grid-row: 1 / 3;
}
/*  */
.two {
	grid-row: 1 / 3;
}
.three {
	grid-row: 1 / 3;
}
.four {
	grid-row: 1 / 3;
}
.five {
	grid-column: 1 / 2;
	grid-row: 3 / 5;
}
.six {
	grid-row: 3 / 5;
}
.seven {
	grid-row: 3 / 5;
}
.eight {
	grid-row: 3 / 5;
}
.nine {
	grid-column: 1 / 2;
	grid-row: 5 / 7;
}
.ten {
	grid-row: 5 / 7;
}
/*  */
.eleven {
	grid-row: 5 / 7;
}
/*  */
.twelve {
	grid-row: 5 / 7;
}
/*  */
/*  */
.thirteen {
	grid-column: 1 / 2;
	grid-row: 7 / 9;
}
/*  */
.fourteen {
	grid-row: 7 / 9;
	/*  */
}
.fifteen {
	grid-row: 7 / 9;
}
.sixteen {
	grid-row: 7 / 9;
}
.seventeen {
	grid-column: 1 / 2;
	grid-row: 9 / 11;
}
.eighteen {
	grid-row: 9 / 11;
}
.nineteen {
	grid-row: 9 / 11;
}
.twenty {
	grid-row: 9 / 11;
}
.twentyone {
	grid-column: 1 / 2;
	grid-row: 11 / 13;
}
.twentytwo {
	grid-row: 11 / 13;
}
/*  */
.twentythree {
	grid-row: 11 / 13;
}
/*  */
.twentyfour {
	grid-row: 11 / 13;
}

@media screen and (max-width: 960px) {
	.profileHome {
		flex-direction: column;
	}
}
</style>

<template>
	<main>
		<!-- <section> -->
			<v-container class="profileHome neonPolice">
				<div class="box one">
					Settings;
					<link rel="icon" href="/favicon.ico" />
					<v-btn class="customButton darkNeonPolice" rounded>About ℹ️</v-btn>
					<v-btn class="customButton darkNeonPolice" rounded>Rules 📄</v-btn>
					<v-btn class="customButton darkNeonPolice" rounded>Help ❓</v-btn>
				</div>
				<div class="box two">
					User infos
					<div>Profile picture</div>
					<div>name 1</div>
					<div>does not display username</div>
				</div>
				<div class="box three"></div>
				<div class="box four">
					<v-btn class="customButton darkNeonPolice" rounded>Modify 🖋</v-btn>
					<v-btn class="customButton darkNeonPolice" rounded>Logout 🚪</v-btn>
				</div>
				<div class="box five">
					Game stats;
					<div></div>
					<div></div>
				</div>
				<div class="box six">
					<v-btn class="customButton darkNeonPolice" rounded @click="$router.push('chat')"
						>Chat</v-btn
					>
				</div>
				<div class="box seven">
					Security
					<v-btn class="customButton darkNeonPolice" rounded>Enable 2FA &#128506;</v-btn>
				</div>
				<div class="box eight">
					Privacy;
					<v-btn class="customButton darkNeonPolice" rounded>Delete account ❌</v-btn>
				</div>
				<div class="box nine">Match history</div>
				<div class="box ten">
					<br />
					<br />
					<v-btn class="customButton darkNeonPolice" rounded @click="$router.push('chat')"
						>Play ▶️</v-btn
					>
				</div>
			</v-container>
		<!-- </section> -->
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
.profileHome {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px;
	gap: 10px;
	/* background-image: url(/src/assets/OmoriWallpapers/OmoriJournal01.png); */
	/* background-size: cover; */
}

.box {
	background-color: darkgreen;
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center; /* Align buttons to the bottom */
	justify-content: space-between; /* Align items to the bottom */
	border: 2px solid #333; /* Couleur de la bordure et épaisseur */
	padding: 10px; /* Ajoutez un espace intérieur pour rendre la bordure plus visible */
	text-align: center;
	border: 5px solid transparent;
  	border-image: linear-gradient(to right, #470979, #00d4ff) 5 repeat;
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
	grid-column: 4 / 5;
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

<template>
	<div class="container">
		<div class="header">
			<img
				v-if="theme === 'white'"
				class="title-image hoverable"
				src="/dashboard/white/OmoriWhiteTitle.png"
				@click="changeTheme"
			/>
			<img
				v-if="theme === 'black'"
				class="title-image hoverable"
				src="/dashboard/dark/OmoriBlackTitle.png"
				@click="changeTheme"
			/>
		</div>
		<div class="content">
			<v-img v-if="theme === 'white'" class="character-image hoverable" src="/dashboard/white/Omori_white_title.gif" @click="redirect('Profile')"/>
			<v-img v-if="theme === 'black'" class="character-image hoverable" src="/dashboard/dark/Omori_black_title.gif" @click="redirect('Profile')" />
			<div class="buttons-container">
				<Button class="title-button" @click="redirect('Chat')">Chat</Button>
				<Button class="title-button" @click="redirect('GameMenu')">Play</Button>
				<Button class="title-button" @click="logout">Quit</Button>
			</div>
			<v-img src="/dashboard/clickable/norminetInvert.png" @click="redirect('Credit')" class="cat-image hoverable" />
			<v-img src="/dashboard/clickable/basilFlower.png" @click="musicControls" class="music-image hoverable" />
		</div>
		<Snackbar
			@click="openNewTab('https://open.spotify.com/artist/0OQtoDQ7RUNHhReM03ypxe?si=OqF4hl-wR5KxIyIF2REt0Q')"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed } from 'vue';
import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { useOnlineSocketStore } from '../stores/online';
import { useBackgroundColorStore } from '../stores/background';

import Snackbar from '../components/layout/Snackbar.vue';
import Button from '../components/layout/Button.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();
const onlineSocketStore = useOnlineSocketStore();
const backgroundColorStore = useBackgroundColorStore();

export default defineComponent({
	name: 'Home',
	components: { Snackbar, Button },
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		const setBackgroundColor = (color: string) => {
			backgroundColorStore.setBackgroundColor(color);
		};

		const disconnect = () => {
			onlineSocketStore.disconnect();
		};

		return {
			JWT,
			user,
			disconnect,
			setBackgroundColor,
		};
	},
	data() {
		return {
			titleOST: new Audio('/sounds/dashboard/001-Title.mp3') as HTMLAudioElement,
			audios: [],
			audio: undefined as HTMLAudioElement | undefined,
			title: '' as string,
			theme: 'white' as string,
		};
	},
	async beforeMount() {
		this.setBackgroundColor(this.theme);
		const token = this.$cookies.get('token');
		if (!this.JWT || token) {
			if (token) {
				this.$cookies.remove('token');
				try {
					await userStore.setJWT(token);
				} catch (err) {
					return this.$router.push({ name: `Login` });
				}
			} else return this.$router.push({ name: `Login` });
		}
	},
	mounted() {
		this.titleOST.volume = 0.5;
		this.titleOST.play();
		this.titleOST.loop = true;
		const sounds = import.meta.glob('/public/sounds/spa2k/*.mp3');
		if (!sounds) return;
		for (let path in sounds) {
			path = path.replace('/public', '');
			const audio = new Audio(path);
			this.audios.push(audio);
		}
	},
	beforeUnmount() {
		if (this.audio && !this.audio.paused) this.audio.pause();
		if (!this.titleOST.paused) this.titleOST.pause();
		this.setBackgroundColor('black');
	},
	methods: {
		async logout() {
			sessionStorage.clear();
			await userStore.deleteUser();
			this.disconnect();
			return this.$router.push({ name: `Login` });
		},
		redirect(path: string) {
			return this.$router.push({ name: path });
		},
		musicControls() {
			if (!this.audios.length) return;
			if (!this.titleOST.paused) this.titleOST.pause();
			if (!this.audio || (this.audio && this.audio.ended)) {
				this.audio = this.audios[Math.floor(Math.random() * this.audios.length)];
				this.audio.volume = 0.5;
				this.audio.play();
				this.title = this.audio.src.split('/').pop() as string;
				this.title = this.title
					.replace(/\.mp3$/, '')
					.replace(/_/g, ' ')
					.replace(/^Spa2k-/, '');
				this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
				snackbarStore.showSnackbar(this.title + ' by Spa2k', 3000, 'purple');
			} else if (this.audio.paused) {
				this.audio.play();
				snackbarStore.showSnackbar(this.title + ' by Spa2k - Play', 2000, 'green');
			} else {
				snackbarStore.showSnackbar(this.title + ' by Spa2k - Paused', 2000, 'orange');
				this.audio.pause();
			}
		},
		openNewTab(url: string) {
			if (this.audio && !this.audio.ended) window.open(url, '_blank');
		},
		redirectToProfile() {
			return this.$router.push({ name: `Profile` });
		},
		changeTheme() {
			if (this.theme === 'white') {
				this.theme = 'black';
				this.setBackgroundColor('black');
			} else {
				this.theme = 'white';
				this.setBackgroundColor('white');
			}
		},
	},
});
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	position: relative;
}

.header {
	position: absolute;
	top: 0;
	width: 100%;
	text-align: center;
	z-index: 1;
}

.title-image {
	width: 20%;
	top: 0%;
	height: auto;
	image-rendering: pixelated;
}

.character-image {
	width: 100%;
	max-height: 60vh;
	position: absolute;
	top: 70%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
}

.buttons-container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	transform: translate(-50%, -50%);
	bottom: 0%;
	width: 100%;
	z-index: 3;
}

.title-button {
	margin: 0 2vw !important;
	position: relative;
	transition: background-position 0.5s;
}
.title-button::before {
	content: '';
	position: absolute;
	left: -60px;
	top: 40%;
	transform: translateY(-50%);
	height: 40px;
	width: 40px;
	background-image: url('/game/UI/handSelection.png');
	background-repeat: no-repeat;
	background-size: contain;
	opacity: 0;
	transition: opacity 0.3s;
	z-index: 0;
}

.music-image {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 1%;
	height: auto;
	z-index: 4;
}

.cat-image {
	position: absolute;
	bottom: 0%;
	right: 98%;
	width: 2%;
	height: auto;
	z-index: 4;
}

.title-button:hover::before {
	opacity: 1;
	animation: slideAnimation 1s linear infinite;
}

@keyframes slideAnimation {
	0% {
		transform: translateX(0);
	}
	50% {
		transform: translateX(10px); /* Ajuster la valeur selon vos besoins */
	}
	100% {
		transform: translateX(0);
	}
}
</style>

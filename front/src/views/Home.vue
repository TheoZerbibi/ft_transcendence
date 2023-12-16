<template>
	<v-container class="d-flex flex-column justify-space-evenly" fill-height min-width="100dvw">
		<v-row>
			<v-col xs12 md6 class="d-flex align-center justify-center">
				<v-card
					class="order-0 pa-2 ma-2 d-flex align-center justify-center rounded-0 bg-white"
					height="80dvh"
					width="100dvw"
					variant="flat"
				>
					<v-img src="/dashboard/omorisPlace.png" />
					<v-img style="width: 51px; height: 67px; left: 574px; top: 393px; position: absolute" id="omori" />
					<v-img
						style="width: 57px; height: 80px; left: 429px; top: 278px; position: absolute"
						id="computer"
						class="hoverable"
						@click="redirect('Channels')"
					/>
					<v-img
						style="width: 85px; height: 119px; left: 630px; top: 248px; position: absolute"
						id="arcade"
						class="hoverable"
						@click="redirect('GameMenu')"
					/>
					<v-img
						style="width: 46px; height: 45px; left: 504px; top: 296px; position: absolute"
						id="phone"
						class="hoverable"
						@click="redirect('Chat')"
					/>
					<v-img
						style="width: 34px; height: 31px; left: 499px; top: 573px; position: absolute"
						id="teapot"
						class="hoverable"
						@click="redirect('418')"
					/>
					<v-img
						style="width: 61px; height: 102px; left: 586px; top: 260px; position: absolute"
						id="jukebox"
						class="hoverable"
						@click="musicControls"
					/>
					<v-img
						style="width: 64px; height: 79px; left: 881px; top: 187px; position: absolute"
						id="mirror"
						class="hoverable"
						@click="redirect('Profile')"
					/>
					<v-img
						style="width: 55px; height: 46px; left: 992px; top: 543px; position: absolute"
						id="norminet"
						class="hoverable"
						@click=""
					/>
				</v-card>
			</v-col>
		</v-row>

		<v-row justify="end" style="max-height: 10dvh">
			<div class="d-flex align-center justify-center hoverable">
				<v-sheet id="doorLogout" class="order-1 pa-2 ma-2" height="10dvh" width="6dvh" @click="logout" />
			</div>
		</v-row>
		<Snackbar @click="openNewTab('https://open.spotify.com/artist/0OQtoDQ7RUNHhReM03ypxe?si=OqF4hl-wR5KxIyIF2REt0Q')"/>
	</v-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { computed } from 'vue';
import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { useOnlineSocketStore } from '../stores/online';

import Snackbar from '../components/layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();
const onlineSocketStore = useOnlineSocketStore();

export default defineComponent({
	name: 'Home',
	components: { Snackbar },
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		const disconnect = () => {
			onlineSocketStore.disconnect();
		};

		return {
			JWT,
			user,
			disconnect,
		};
	},
	data() {
		return {
			audios: [],
			audio: undefined as HTMLAudioElement | undefined,
			title: '' as string,
		};
	},
	mounted() {
		const sounds = import.meta.glob('/public/sounds/spa2k/*.mp3');
		if (!sounds) return;
		for (let path in sounds) {
			path = path.replace('/public', '');
			const audio = new Audio(path);
			this.audios.push(audio);
		}
	},
	async beforeMount() {
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
	beforeUnmount() {
		if (this.audio) this.audio.pause();
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
			if (!this.audio || (this.audio && this.audio.ended)) {
				this.audio = this.audios[Math.floor(Math.random() * this.audios.length)];
				this.audio.volume = 0.5;
				this.audio.play();
				this.title = this.audio.src.split('/').pop() as string;
				this.title = this.title.replace(/\.mp3$/, '').replace(/_/g, ' ').replace(/^Spa2k-/, '');
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
			if (this.audio && !this.audio.ended)
				window.open(url, '_blank');
		},
	},
});
</script>

<style scoped>

#doorLogout {
	content: url('/dashboard/clickable/doorClosed.png');
	object-fit: cover;
	object-position: center;
	background-color: transparent;
}

#doorLogout:hover {
	content: url('/dashboard/clickable/doorOpen.png');
	object-fit: cover;
	object-position: center;
	background-color: transparent;
}

#omori {
	content: url('/dashboard/clickable/Omori.png');
}

#arcade {
	content: url('/dashboard/clickable/arcadePong.png');
}

#computer {
	content: url('/dashboard/clickable/computerChannels.png');
}

#jukebox {
	content: url('/dashboard/clickable/jukeBox.png');
}

#mirror {
	content: url('/dashboard/clickable/mirrorProfile.png');
}

#norminet {
	content: url('/dashboard/clickable/norminetInvert.png');
}

#phone {
	content: url('/dashboard/clickable/phoneChat.png');
}

#teapot {
	content: url('/dashboard/clickable/teaPot.png');
}
</style>

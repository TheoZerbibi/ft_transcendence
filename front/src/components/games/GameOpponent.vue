<template>
	<v-container fluid fill-height class="diagonal-split">
		<div class="sky-part" />
		<div class="sunset-part" />

		<div id="leftUser" class="player-frame top-left">
			<v-img class="cadre-responsive" :src="'/game/UI/cadres/cadre0.png'">
				<h2>{{ leftPlayer.displayName }}</h2>
				<v-img class="avatar-responsive" :src="leftPlayer.avatar" />
			</v-img>
		</div>

		<div class="d-flex justify-center align-center fill-height">
			<img class="versus" src="/game/UI/VS.png"/>
		</div>

		<div id="rightUser" class="player-frame bottom-right">
			<v-img class="cadre-responsive" :src="'/game/UI/cadres/cadre0.png'">
				<h2>{{ rightPlayer.displayName }}</h2>
				<v-img class="avatar-responsive" :src="rightPlayer.avatar" />
			</v-img>
		</div>

		<v-btn
			absolute
			width="22vw"
			:style="buttonStyle"
			:disabled="hasAccepted"
			class="fight-button"
			:class="{ accepted: hasAccepted }"
			@mouseover="showOverlay = true"
			@mouseleave="showOverlay = false"
			@click="userIsReady()"
		>
			<div v-show="showOverlay" class="overlay" :class="{ 'slide-animation': showOverlay }">
				<img src="/game/UI/handSelection.png" alt="Hand Image" />
			</div>
		</v-btn>
	</v-container>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import Snackbar from '../layout/Snackbar.vue';
import { useSnackbarStore } from '../../stores/snackbar';
import { useSocketStore } from '../../stores/websocket';
import { useUser } from '../../stores/user';

const snackbarStore = useSnackbarStore();

export default {
	name: 'GameCreatorView',
	components: { Snackbar },
	beforeRouteLeave(to: any, from: any, next: any) {
		snackbarStore.hideSnackbar();
		next();
	},
	props: {
		leftPlayer: {
			type: Object,
			default: () => {
				return {
					id: 0,
					login: '',
					displayName: '',
					avatar: '',
				};
			},
		},
		rightPlayer: {
			type: Object,
			default: () => {
				return {
					id: 0,
					login: '',
					displayName: '',
					avatar: '',
				};
			},
		},
	},
	setup() {
		const userStore = useUser();
		const webSocketStore = useSocketStore();
		const route = useRoute();

		const isConnected = computed(() => webSocketStore.isConnected);
		const socket = computed(() => webSocketStore.getSocket);
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		const gameUID = computed(() => route.params.uid as string);

		return {
			isConnected,
			socket,
			JWT,
			user,
			gameUID,
		};
	},
	data() {
		return {
			showOverlay: false,
			buttonStyle: {
				backgroundImage: 'url(/game/UI/fightButton.png)',
				backgroundPosition: 'center center',
				backgroundSize: '100% 100%',
				backgroundRepeat: 'no-repeat',
			},
			buttonBottomPosition: '10%',
			buttonLeftPosition: '50%',
			hasAccepted: false,
		};
	},
	methods: {
		userIsReady() {
			this.hasAccepted = true;
			this.socket.emit('player-ready', {
				gameUID: this.gameUID,
			});
		},
	},
};
</script>

<style scoped>
.player-frame {
	position: absolute;
	animation-duration: 0.5s;
	animation-fill-mode: both;
	animation-timing-function: ease-out;
}

.top-left {
	top: 10vw;
	left: 10vw;
	animation-name: slideInFromTop;
}

.bottom-right {
	bottom: 10vw;
	right: 10vw;
	animation-name: slideInFromBottom;
}

@keyframes slideInFromTop {
	from {
		transform: translateY(-100%);
	}
	to {
		transform: translateY(0);
	}
}

@keyframes slideInFromBottom {
	from {
		transform: translateY(100%);
	}
	to {
		transform: translateY(0);
	}
}

.cadre-responsive {
	width: 15vw;
	position: relative;
	overflow: hidden;
}

.avatar-responsive {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -9999;
}

h2 {
	font-family: 'OMORI_MAIN', sans-serif;
	margin-top: 1.6vw;
	font-size: 3vw;
	text-align: center;
	color: white;
	line-height: 0px;
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}

.versus {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 99999;
}

.fight-button {
	position: absolute;
	width: 22vw;
	left: 50%;
	top: 90%;
	transform: translateX(-50%);
}

.accepted {
	filter: grayscale(100%);
}

.diagonal-split {
	position: relative;
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	overflow: hidden;
}

.sky-part,
.sunset-part {
	position: absolute;
	width: 100%;
	height: 100%;
	background-size: cover;
	clip-path: polygon(0 0, 100% 0, 0 100%);
	animation-duration: 0.3s;
	animation-fill-mode: both;
	animation-timing-function: ease-out;
}

.sky-part {
	background-image: url('/game/battleParallax/sky-parallax.png');
	animation-name: slideInFromLeft;
}

.sunset-part {
	background-image: url('/game/battleParallax/sunset-parallax.png');
	clip-path: polygon(100% 0, 100% 100%, 0 100%);
	animation-name: slideInFromRight;
}

@keyframes slideInFromLeft {
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0);
	}
}

@keyframes slideInFromRight {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
}

.overlay {
	position: absolute;
	top: 0;
	left: 4vw;
	width: 100%;
	height: 100%;
	background: none;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: flex-start; /* Alignez l'image à gauche de l'overlay */
}
.overlay img {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain; /* Ajuste la taille de l'image tout en préservant les proportions */
}

.slide-animation {
	animation: slideAnimation 1s linear infinite; /* Définir la durée, le type et le nombre d'itérations */
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

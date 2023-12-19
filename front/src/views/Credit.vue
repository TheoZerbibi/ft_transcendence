<template>
	<v-container fill-height class="pa-0 ma-0 position-relative">
		<video playsinline autoplay loop class="responsive-video">
			<source src="/videos/Omori_Final_Duet.mp4" type="video/mp4" />
		</video>
		<div class="overlay-text">
			<h1></h1>
		</div>
		<div v-if="mate" class="stud-mate">
			<h1>Authors</h1>
			<h2>- Theo - DevOps, Backend, Game, Auth</h2>
			<h2>- Semiha - Design, Front, Chat</h2>
			<h2>- Noemi - Chat, Backend</h2>
			<h2>- Gaelle - Front, Review</h2>
		</div>
		<div v-if="backend" class="backend-mate">
			<h1>Backend Helpers</h1>
			<h2>- Riblanc</h2>
			<h2>- Anclarma</h2>
			<h2>- Mlabouri</h2>
			<h2>- Jgiron</h2>
		</div>
		<div v-if="bugHunter" class="bug-hunter-mate">
			<h1>Extern Bug Hunters</h1>
			<h2>- Anclarma</h2>
			<h2>- Emaugale</h2>
			<h2>- Nsainton</h2>
		</div>
		<div v-if="advisors" class="advisor-mate">
			<h1>Advisor</h1>
			<h2>- Anclarma</h2>
			<h2>- Emaugale</h2>
			<h2>- Tmatis</h2>
			<h2>- Nsainton</h2>
			<h2>- Fcatinau</h2>
			<h2>- Mlormois</h2>
		</div>
	</v-container>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
	data() {
		return {
			mate: false as Boolean,
			backend: false as Boolean,
			bugHunter: false as Boolean,
			advisors: false as Boolean,
			interval: null as any,
		};
	},
	async mounted() {
		let time = 0;
		this.interval = setInterval(() => {
			time++;
			console.log(time);
			if (time >= 20 && time < 24) {
				this.mate = true;
			} else if (time >= 24 && time < 29) {
				this.backend = true;
			} else if (time >= 29 && time < 41) {
				this.mate = false;
				this.backend = false;
			} else if (time >= 41 && time < 45) {
				this.bugHunter = true;
			} else if (time >= 45 && time < 52) {
				this.bugHunter = false;
				this.advisors = true;
			} else if (time >= 52 && time < 60) {
				this.advisors = false;
			}

			if (time >= 132) {
				this.mate = false;
				this.backend = false;
				this.bugHunter = false;
				this.advisors = false;
				time = 0;
			}
		}, 1000);
	},
	beforeOnUnmounted() {
		clearInterval(this.interval);
	},
});
</script>

<style scoped>
.responsive-video {
	width: 100vw;
	height: 100vh;
	object-fit: contain;
	position: absolute;
	top: 0;
	left: 0;
}

.position-relative {
	position: relative;
}

.overlay-text {
	position: absolute;
	top: 100%;
	left: 50%;
	color: white;
	text-align: center;
	z-index: 2;
}

.stud-mate {
	position: absolute;
	top: 10vw;
	left: 20%;
	transform: translate(-50%, -50%);
	color: white;
	z-index: 2;
	animation-duration: 0.5s;
	animation-fill-mode: both;
	animation-timing-function: ease-out;
	animation-name: slideInFromTop;
}

.backend-mate {
	position: absolute;
	top: 2vw;
	left: 75%;
	transform: translate(-50%, -50%);
	color: white;
	z-index: 2;
	animation-duration: 0.5s;
	animation-fill-mode: both;
	animation-timing-function: ease-out;
	animation-name: slideInFromRight;
}

.bug-hunter-mate {
	position: absolute;
	top: 43vw;
	left: 50%;
	transform: translate(-50%, -50%);
	color: white;
	z-index: 2;
	animation-duration: 0.5s;
	animation-fill-mode: both;
	animation-timing-function: ease-out;
	animation-name: slideInFromBottom;
}

.advisor-mate {
	position: absolute;
	top: 1vw;
	left: 50%;
	transform: translate(-50%, -50%);
	color: white;
	z-index: 2;
	animation-duration: 0.5s;
	animation-fill-mode: both;
	animation-timing-function: ease-out;
	animation-name: slideInFromTop;
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

h1 {
	font-size: 2vw;
	font-family: 'OMORI_MAIN';
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}

h2 {
	font-size: 1vw;
	font-family: 'OMORI_MAIN';
	text-shadow:
		1px 1px 2px plum,
		0 0 1em purple,
		0 0 0.2em goldenrod;
}
</style>

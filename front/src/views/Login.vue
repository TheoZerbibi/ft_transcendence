<template>
	<v-container fill-height fluid id="background" :class="{
		'bg-black': hovering || clicked || step > 0,
		'bg-white': !hovering && !clicked && step === 0,
	}">
		<v-row no-gutters class="d-flex align-center justify-center" style="height: 96dvh" v-if="step === 0">
			<audio controls id="myVideo" autoplay loop hidden>
				<source src="/sounds/002-WHITE SPACE.mp3" type="audio/wav" />
				Your browser does not support the audio element.
			</audio>

			<div class="door-container d-flex align-center justify-center">
				<v-img id="door" src="/ui/Door.png" class="hoverable" @click="startZoomEffect" @mouseover="hovering = true"
					@mouseleave="hovering = false" :class="{ zooming: isZooming }" cover height="50dvh" width="16dvh"
					:style="{
						transform: `scale(${zoomLevel})`,
						transformOrigin: '90% 45%',
						transition: isZooming ? 'transform 1s ease-in-out' : 'none',
					}" />
				<v-img v-show="something" id="something" src="/ui/Something_White_Space.gif" cover height="100dvh"
					width="100dvh" :style="{
						maxWidth: '100%',
						maxHeight: '100%',
					}" />
			</div>
		</v-row>

		<v-row v-if="step > 0" no-gutters class="d-flex align-center justify-center" style="height: 96dvh;">
			<v-col cols="4" class="d-flex flex-column align-center justify-center">
				<audio controls id="myVideo" autoplay loop hidden>
					<source src="/sounds/004-Spaces In-between.mp3" type="audio/wav" />
					Your browser does not support the audio element./
				</audio>

				<div v-if="step === 1" class="d-flex flex-column align-center justify-center">
					<h3 class="omoriFont text-center">Hello there... what's your name?</h3>
					<InputBar @newInput="newUser.display_name = $event" placeholder="Enter your name here..."
						@keyup.enter="nextStep" @click="nextStep" margin="1dvh" >
						<template v-slot:buttonText>
							that's my name!
						</template>
					</InputBar>
				</div>

				<div v-if="step === 2" class="d-flex flex-column align-center justify-center">
					<h3 class="omoriFont text-center">Nice to meet you {{ newUser.display_name }}!</h3>
					<h3 class="omoriFont text-center">Is that you in the picture?</h3>
					<UploadFile @imageChanged="updateAvatar">
						<template v-slot:polaroidImg>
							<v-img v-if="newUser.avatar" :src="newUser.avatar" class="hoverable" alt="Uploaded Image">
								<v-progress-circular indeterminate color="red-accent-2" v-if="cantSkip" />
							</v-img>
						</template>
					</UploadFile>
					<Button @click="nextStep" :disabled="cantSkip">That's me!</Button>
				</div>

				<div v-if="step === 3" class="d-flex align-center justify-center">
					<h3 class="omoriFont text-center white--text ma-4">Welcome to OmoriPong {{ newUser.display_name }}!</h3>
					<img src="/ui/handSelection.png" @click="nextStep" class="hoverable hand" alt="Hand Image" />
				</div>

				<div v-if="step === 5" class="d-inline-flex flex-column align-center justify-center">
					<h3 class="omoriFont text-center">Well well well... If this isn't {{ user.display_name }}!</h3>
					<h3 class="omoriFont text-center">What's the password?</h3>
					<form @submit.prevent="logTwoFactorAuthentication"
						class="d-inline-flex flex-column align-center justify-center">
						<v-otp-input variant="solo-filled" v-model="verificationCode" required />
						<Button @click="logTwoFactorAuthentication">Knock Knock...</Button>
					</form>
				</div>

<!-- 				<sheet id="album" :style="albumStyle">
					<img src="/ui/ALBUM.png"  alt="Album" />
					<div v-if="step === 2">
						<h3 class="text--black omoriFont text-center">{{ newUser.display_name }}</h3> 
					</div>
				</sheet> -->
			</v-col>
		</v-row>
		<Snackbar />
	</v-container>
</template>

<script lang="ts">
import Snackbar from '../components/layout/Snackbar.vue';
import UploadFile from '../components/layout/UploadFile.vue';
import Button from '../components/layout/Button.vue';
import InputBar from '../components/layout/InputBar.vue';
import Polaroid from '../components/layout/Polaroid.vue';
import { computed } from 'vue';
import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { set } from 'date-fns';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	name: 'Login',
	components: {
		Snackbar,
		UploadFile,
		Button,
		InputBar,
		Polaroid,
	},
	beforeRouteLeave(to: any, from: any, next: any) {
		snackbarStore.hideSnackbar();
		next();
	},
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		const newUser = {
			login: '' as string,
			email: '' as string,
			display_name: '' as string,
			avatar: '' as string,
		};

		return {
			JWT,
			user,
			newUser,
		};
	},
	data() {
		return {
			step: 0 as number,
			avatar: undefined as File | undefined,
			verificationCode: '' as string,
			FAToken: '' as string,
			cantSkip: false,
			isZooming: false,
			zoomLevel: 1,
			something: false,
			hovering: false,
			clicked: false,
		};
	},
	computed: {
		albumStyle() {
			const scale = 1 + this.step * 0.3;
			const translateY = -(this.step * 25);

			if (this.step === 3) {
				return {
					transform: `scale(2) translateY(-200px)`,
					transition: 'all 0.5s ease-in-out',
				};
			}

			return {
				transform: `scale(${scale}) translateY(${translateY}px)`,
				transition: 'all 0.5s ease-in-out',
			};
		},
	},
	async beforeMount() {
		if (this.$cookies.get('2FA')) {
			this.FAToken = this.$cookies.get('2FA');
			console.log(this.FAToken);
			snackbarStore.showSnackbar('2FA enabled', 3000, 'green');
			this.step = 5;
			this.$cookies.remove('2FA');
		} else if (this.$cookies.get('token')) {
			const token = this.$cookies.get('token');
			this.$cookies.remove('token');
			try {
				await userStore.setJWT(token);
			} catch (err) {
				snackbarStore.showSnackbar('Invalid credentials', 3000, 'red');
				return this.$router.push({ name: `Home` });
			}
		} else if (this.$cookies.get('userOnboarding')) {
			const cookie = this.$cookies.get('userOnboarding');
			this.step = 1;
			this.newUser.login = cookie.login;
			this.newUser.email = cookie.email;
			this.newUser.avatar = cookie.avatar;
		} else {
			this.step = 0;
		}
	},
	methods: {
		async logTwoFactorAuthentication() {
			if (!this.verificationCode) return snackbarStore.showSnackbar('Please enter a code', 3000, 'red');
			const requestBody = { code: this.verificationCode };

			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/2fa/authenticate`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.FAToken}`,
						},
						body: JSON.stringify(requestBody),
					},
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				const data = await response.json();
				this.$cookies.set('token', data.access_token, '1m');
				this.$router.push({ name: `Home` });
			} catch (error) {
				snackbarStore.showSnackbar('Error 2FA', 3000, 'red');
			}
		},

		async postToUsers() {
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(this.newUser),
			};

			this.$cookies.remove('userOnboarding');
			await fetch(`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users`, requestOptions)
				.then(async (response) => {
					if (!response.ok) {
						const error = await response.json();
						snackbarStore.showSnackbar(error.message, 3000, 'red');
						return;
					}
					const data = await response.json();
					if (data) {
						this.$cookies.set('token', data.access_token, '1m');
						this.$router.push({ name: `Home` });
					}
				})
				.catch((error) => {
					console.error(error);
				});
		},

		redirectToOAuth() {
			const HOST = import.meta.env.VITE_HOST;
			const PORT = import.meta.env.VITE_API_PORT;

			window.location.href = `http://${HOST}:${PORT}/auth/42/callback`;
		},

		async updateAvatar(newAvatar: File) {
			const formData = new FormData();
			if (newAvatar) {
				formData.append('file', newAvatar);
				formData.append('login', this.newUser.login);
			} else {
				return console.error('newAvatar is not a File object');
			}
			this.cantSkip = true;
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT
					}/users/getCloudinaryLinkOnboarding`,
					{
						method: 'POST',
						body: formData,
					},
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					this.cantSkip = false;
					return;
				}

				const data = await response.json();
				this.newUser.avatar = data.avatar;
				this.cantSkip = false;
			} catch (error) {
				this.cantSkip = false;
				snackbarStore.showSnackbar('Error uploading avatar', 3000, 'red');
			}
		},
		async nextStep() {
			console.log('step' + this.step);
			if (this.step === 1) {
				if (!this.newUser.display_name) {
					snackbarStore.showSnackbar('Please enter a name', 3000, 'red');
					return;
				}

				const result = await this.checkDisplayName();
				if (!result.success) return;
			}
			this.step++;
			if (this.step == 4) {
				await this.postToUsers();
			}
		},
		async checkDisplayName(): Promise<any> {
			try {
				const body = {
					login: this.newUser.login,
					displayName: this.newUser.display_name,
				};
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/getDisplayName`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(body),
					},
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return { success: false, error };
				}

				const data = await response.json();
				return { success: true, data };
			} catch (error) {
				return { success: false, error };
			}
		},
		startZoomEffect() {
			this.doorToSomethingTransition();
			this.clicked = true;
			this.isZooming = true;
			this.zoomIn();
		},
		zoomIn() {
			if (this.zoomLevel < 100) {
				this.zoomLevel += 8;

				setTimeout(() => {
					this.zoomIn();
				}, 100);
			} else {
				setTimeout(() => {
					this.something = true;
				}, 300);
				setTimeout(() => {
					this.redirectToOAuth();
				}, 600);
				setTimeout(() => {
					this.isZooming = false;
					this.clicked = false;
					this.zoomLevel = 1;
					this.something = false;
				}, 3000);
			}
		},
		doorToSomethingTransition() {
			const doorContainer = document.querySelector('.door-container') as HTMLDivElement;
			const door = document.querySelector('#door') as HTMLImageElement;
			const somethingImage = document.querySelector('#something') as HTMLImageElement;
			if (!door || !somethingImage || !doorContainer) return;

			doorContainer.classList.remove('door-container');
			let doorOpacity = 1;
			let imageOpacity = 0;

			somethingImage.style.position = 'fixed';
			somethingImage.style.width = '100vw';
			somethingImage.style.height = '100vh';
			somethingImage.style.zIndex = '9999';
			somethingImage.style.opacity = '0';

			const timer = setInterval(() => {
				if (doorOpacity <= 0) {
					if (imageOpacity >= 1) {
						clearInterval(timer);
					} else {
						imageOpacity += 0.01;
						somethingImage.style.opacity = imageOpacity as unknown as string;
					}
				} else {
					doorOpacity -= 0.01;
					door.style.opacity = doorOpacity as unknown as string;
				}
			}, 10);
		},
	},
};
</script>

<style>
#door {
	image-rendering: optimizeQuality;
	pointer-events: auto;
	position: relative;
	opacity: 1;
	transition: opacity 0.3s ease-out;
	aspect-ratio: 1;
	object-fit: contain;
}

#something {
	image-rendering: optimizeQuality;
	position: relative;
	object-fit: contain;
	aspect-ratio: 1;
	position: 0;
	width: 0;
	height: 0;
	z-index: 0;
	opacity: 0;
	transition: width 1s ease-in;
}

#album {
	position: fixed;
	bottom: -20%;
	left: 0;
	right: 0;
	max-width: 40dvw;
	transition: all 0.5s ease-in-out;
}

#background {
	background-color: black;
}

.door-container {
	transition: box-shadow 0.5s ease-in-out;
}

.zooming,
#door:hover {
	filter: brightness(10);
	filter: invert(1);
}

#background.bg-white {
	background-color: white;
	transition: all 0.2s ease-out;
}

#background.bg-black {
	background-color: black;
	transition: all 0.2s ease-out;
}

.door-container:hover {
	animation:
		neon-light 0.5s 0.3s,
		heartbeat 0.8s infinite 0.8s;
	box-shadow:
		0 3px 20px #ff0000,
		0 3px 30px #ff0000;
}

.hand {
	width: 4dvw;
	;
	position: relative;
	transition: all 0.2s ease-out;
}

.hand:hover {

	animation: slideAnimation 1s linear infinite;
	/* Définir la durée, le type et le nombre d'itérations */
}

@keyframes slideAnimation {
	0% {
		transform: translateX(0);
	}

	50% {
		transform: translateX(10px);
		/* Ajuster la valeur selon vos besoins */
	}

	100% {
		transform: translateX(0);
	}
}



@keyframes neon-light {
	0%, 100% { box-shadow: 0 3px 5px #ff0000;	}
	50% { box-shadow:
		0 3px 20px #ff0000,
		0 3px 30px #ff0000; 
	}
}

@keyframes heartbeat {
	0%, 100% { box-shadow: 0 3px 15px #ff0000; }
	50% { box-shadow:
		0 3px 30px #ff0000,
		0 3px 40px #ff0000;
	}
}
</style>

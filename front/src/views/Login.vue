<template>
	<v-container 
		fill-height
		fluid 
		id="background"
		:class="{ 
			'bg-black': hovering || clicked || step > 0,
			'bg-white': !hovering && !clicked && step === 0,
		}"
		>
        <v-row
			align="center"
			no-gutters
			xs12
			md6
			class="d-flex justify-center align-center"
			style="height: 100vh;"
		>
			
			<div v-if="step === 0" class="door-container align-center justify-center" align="center">
				<audio controls id="myVideo" autoplay loop hidden>
					<source src="/sounds/002-WHITE SPACE.mp3" type="audio/wav" />
					Your browser does not support the audio element.
				</audio>
					<v-img 
						id="door"
						src="/ui/Door.png"
						class="hoverable"
						@click="startZoomEffect"
						@mouseover="hovering = true"
						@mouseleave="hovering = false"
						:class="{zooming: isZooming}"
						cover
						:height="400"
						:width="130"
						:style="{
							transform: `scale(${zoomLevel})`,
							transformOrigin: '90% 45%',
							transition: isZooming ? 'transform 1s ease-in-out' : 'none',
						}"
					/>
					<v-img 
						v-show="something"
						id="something" 
						src="/ui/Something_White_Space.gif"
						cover
						height="100dvh"
						width="100dvh"
						:style="{
							// transform: 'translate(-50%, -50%)',
							maxWidth: '100%',
							maxHeight: '100%',
					}" />
			</div>
			
			<div v-if="step > 0" class="align-center justify-center">
				<audio controls id="myVideo" autoplay loop hidden>
					<source src="/sounds/004-Spaces In-between.mp3" type="audio/wav" />
					Your browser does not support the audio element.
				</audio>	
				
				<div v-if="step === 1" >
					<h3 class="omoriFont">Hello there... what's your name?</h3>
					<InputBar 
						@newInput="newUser.display_name = $event"
						placeholder="Enter your name here..."
						@keyup.enter="nextStep"
						/>
					<Button @click="nextStep" width="250px">that's my name!</Button>
				</div>
				
				<div v-if="step === 2">
					<h3 class="omoriFont">Nice to meet you {{ newUser.display_name }}! Is that you on the picture?</h3>
					<div class="image-container">
						<UploadFile @imageChanged="updateAvatar" class="upload-file hoverable" >
							<template v-slot:image>
								<v-img 
									v-if="newUser.avatar"
									:src="newUser.avatar"
									class="hoverable"
									alt="Uploaded Image">
									<v-progress-circular 
										indeterminate
										color="red-accent-2"
										v-if="cantSkip"
									/>
								</v-img>
							</template>
						</UploadFile>
					</div>
					<Button @click="nextStep" :disabled="cantSkip" width="250px">That's me!</Button>
				</div>
				
				<div v-if="step === 4">
					<v-form @submit.prevent="logTwoFactorAuthentication">
						<InputBar v-model="verificationCode" label="Enter Verification Code"
							required></InputBar>
						<Button type="submit">Send code</Button>
					</v-form>
				</div>
				
				<img src="/ui/ALBUM.png" :style="albumStyle" id="album" alt="Album" />
			</div>
		</v-row>
		<Snackbar />
	</v-container>
</template>


<script lang="ts">
import Snackbar from '../components/layout/Snackbar.vue';
import UploadFile from '../components/layout/UploadFile.vue';
import Button from '../components/layout/Button.vue';
import InputBar from '../components/layout/InputBar.vue';
import { computed } from 'vue';
import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';
import { set } from 'date-fns';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	name: 'Login',
	components: { Snackbar, UploadFile, Button, InputBar },
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
			const scale = 1 + this.step * 0.1;
			const translateY = this.step * 25;
			return {
				transform: `scale(${scale}) translateY(${translateY}px)`,
			};
		},
	},
	async beforeMount() {
		if (this.$cookies.get('2FA')) {

			this.FAToken = this.$cookies.get('2FA');
			console.log(this.FAToken);
			snackbarStore.showSnackbar('2FA enabled', 3000, 'green');
			this.step = 4;
			this.$cookies.remove('2FA');
		} 
		
		else if (this.$cookies.get('token')) {

			const token = this.$cookies.get('token');
			this.$cookies.remove('token');
			try {
				await userStore.setJWT(token);
			} catch (err) {
				snackbarStore.showSnackbar('Invalid credentials', 3000, 'red');
				return this.$router.push({ name: `Home` });
			}
		}
		
		else if (this.$cookies.get('userOnboarding')) {
			const cookie = this.$cookies.get('userOnboarding');
			this.step = 1;
			this.newUser.login = cookie.login;
			this.newUser.email = cookie.email;
			this.newUser.avatar = cookie.avatar;
		}
		
		else {
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
			} 
			
			catch (error) {
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
			console.log("step" + this.step);
			if (this.step === 1) {

				if (!this.newUser.display_name) {

					console.log("step" + this.step + " = " + this.newUser.login);
					snackbarStore.showSnackbar('Please enter a name', 3000, 'red');
					return;
				}
				
				console.log("step" + this.step + " = " + this.newUser.display_name);
				const result = await this.checkDisplayName();
				if (!result.success) return;
			}
			this.step++;
			if (this.step == 3) {
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
    		somethingImage.style.top = '0';
    		somethingImage.style.left = '0';
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
    		}, 5); 
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
	object-fit: contain; /* Do not scale the image */
}

#something {
	image-rendering: optimizeQuality;
	position: relative;
	object-fit: contain; /* Do not scale the image */
	aspect-ratio: 1;
	position: 0;
	top: 0;
	left: 0;
	width: 0;
	height: 0;
	z-index: 0;
	opacity: 0;
	transition:
		width 1s ease-in-out,
		top 1s ease-in-out,
		left 1s ease-in-out;
}
#album {
	position: fixed;
	bottom: -15%;
	left: 0;
	right: 0;
	margin: auto;
	width: 300px;
}

#background {
	background-color: black;
}

.door-container {
	transition: box-shadow 0.5s ease-in-out;
}

.image-container {
	top: 0;
	left: 0;
	position: relative;
	justify-content: center;
	display: flex;
	align-items: center;
	height: 300px;
	width: 250px;
}

.upload-file {
	position: absolute;
	height: 100%;
	width: 100%;
}

.zooming, #door:hover {
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
    animation: neon-light 0.5s 0.3s, heartbeat 0.8s infinite 0.8s;
    box-shadow: 0 3px 20px #ff0000, 0 3px 30px #ff0000;
}

@keyframes neon-light {
    0%, 100% { box-shadow: 0 3px 5px #ff0000; }
    50% { box-shadow: 0 3px 20px #ff0000, 0 3px 30px #ff0000; }
}

@keyframes faint-pulse {
    0%, 100% { box-shadow: 0 3px 5px #ff0000; }
    50% { box-shadow: 0 3px 20px #ff0000, 0 3px 30px #ff0000; }
}

@keyframes heartbeat {
	0%, 100% { box-shadow: 0 3px 15px #ff0000; }
    50% { box-shadow: 0 3px 30px #ff0000, 0 3px 40px #ff0000; }
}
</style>

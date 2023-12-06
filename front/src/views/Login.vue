<template>
		<v-row
		align="center"
		justify="center"
		class="fill-height d-flex"
		:class="{ background: step === 0, 'black-background': step > 0 }"
		>
		<div v-if="step === 0">
			<audio controls id="myVideo" autoplay loop hidden>
				<source src="/sounds/002-WHITE SPACE.mp3" type="audio/wav" />
				Your browser does not support the audio element.
			</audio>
			<img
			src="/ui/Door.png"
			class="door"
			@click="startZoomEffect"
			:style="{
				transform: `scale(${zoomLevel})`,
				transformOrigin: '90% 45%',
				transition: zooming ? 'transform 1s ease-in-out' : 'none',
			}"
			/>
			<img
			v-if="something"
			src="/ui/Something_White_Space.gif"
			class="something"
			:style="{
				width: `95vw`,
				height: 'auto',
				top: '0',
				left: '0',
			}"
			/>
		</div>
		<div v-if="step > 0">
			<audio controls id="myVideo" autoplay loop hidden>
				<source src="/sounds/004-Spaces In-between.mp3" type="audio/wav" />
				Your browser does not support the audio element.
			</audio>
			<v-card class="card-container" color="tranparent">
				<div v-if="step === 1" class="card-content">
					<input
					type="text"
					@keyup.enter="nextStep"
					v-model="newUser.display_name"
					placeholder=" ENTER YOUR NAME "
					class="input"
					/>
					<button @click="nextStep" class="next-button" />
				</div>
				<div v-if="step === 2" class="card-content">
					<UploadFile @imageChanged="updateAvatar" />
					<v-img v-if="newUser.avatar" :src="newUser.avatar" class="uploaded-image" alt="Uploaded Image">
						<v-progress-circular indeterminate color="deep-purple-accent-2" v-if="cantSkip" />
					</v-img>
					<button @click="nextStep" class="next-button" :disabled="cantSkip" />
				</div>
				<div v-if="step === 4" class="card-content">
					<v-form @submit.prevent="logTwoFactorAuthentication">
						<v-text-field
						v-model="verificationCode"
						label="Enter Verification Code"
						required
						></v-text-field>
						<v-btn type="submit">Send code</v-btn>
					</v-form>
				</div>
			</v-card>
			<img src="/ui/ALBUM.png" class="album" alt="Album" />
		</div>
	</v-row>
	<Snackbar />
</template>


<script lang="ts">
import Snackbar from '../components/layout/Snackbar.vue';
import UploadFile from '../components/layout/UploadFile.vue';
import { computed } from 'vue';
import { useUser } from '../stores/user';
import { useSnackbarStore } from '../stores/snackbar';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	name: 'Login',
	components: { Snackbar, UploadFile },
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
			zooming: false,
			zoomLevel: 1,
			something: false,
		};
	},
	async beforeMount() {
		if (this.$cookies.get('2FA')) {
			this.FAToken = this.$cookies.get('2FA');
			console.log(this.FAToken);
			snackbarStore.showSnackbar('2FA enabled', 3000, 'green');
			this.step = 4;
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
				console.error(error);
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
				`http://${import.meta.env.VITE_HOST}:${
					import.meta.env.VITE_API_PORT
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
				console.error(error);
			}
		},
		async nextStep() {
			if (this.step === 1) {
				if (!this.newUser.display_name) {
					snackbarStore.showSnackbar('Please enter a name', 3000, 'red');
					return;
				}
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
			this.zooming = true;
			this.zoomIn();
		},
		zoomIn() {
			if (this.zoomLevel < 100) {
				this.zoomLevel += 8;
				this.somethingTop = 50 - this.zoomLevel / 2;
				this.somethingLeft = 60 - this.zoomLevel / 2;
				
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
					this.zooming = false;
					this.zoomLevel = 1;
					this.something = false;
				}, 3000);
			}
		},
	},
};
</script>

<style>
.background {
	background-color: white;
	pointer-events: none;
}

.black-background {
	background-color: black;
}

.door {
	height: 40vw;
	pointer-events: auto;
}

.album {
	position: fixed;
	bottom: -15%;
	left: 0;
	right: 0;
	margin: auto;
	width: 300px;
}

.input {
	font-family: 'OMORI_MAIN', sans-serif;
	outline: thick double white;
	word-wrap: break-word;
	margin: 16px;
	height: 30px;
}

.next-button {
	outline: thick double white;
	margin: 16px;
	height: 30px;
	width: 30px;
}

.card-container {
	display: flex;
	flex-direction: line;
	align-items: center;
	justify-content: center;
}

.card-content {
	display: flex;
	flex-direction: line;
	align-items: center;
	justify-content: center;
}

.file-input {
	display: none;
}

.file-input + .next-button {
	margin-top: 10px;
}

.door:hover {
	-webkit-filter: brightness(10);
	filter: brightness(10);
	filter: invert(1);
	cursor: url(https://www.omori-game.com/img/cursor/cursor.png), auto;
	-webkit-box-shadow: 0 4px 4px -2px #000000;
	-moz-box-shadow: 0 4px 4px -2px #000000;
	box-shadow: 0 40px 40px -2px #000000;
	transition: 0.5s ease-in-out all;
}

.background:hover {
	background-color: black;
	transition: 1s ease-in-out all;
}

.input:hover {
	cursor: url(https://www.omori-game.com/img/cursor/cursor.png), auto;
}

.next-button:hover {
	cursor: url(https://www.omori-game.com/img/cursor/cursor.png), auto;
}

.something {
	position: absolute;
	transition:
	width 1s ease-in-out,
	top 1s ease-in-out,
	left 1s ease-in-out;
}

.uploaded-image {
	width: 100px;
	height: 100px;
	margin-left: 10px;
	object-fit: cover;
}
</style>

<template>
	<div class="div pa-2 d-flex flex-row align-center">
		<v-card-title>@{{ userLogin }}</v-card-title>
		<v-spacer></v-spacer>
	</div>
	<v-card>
		<div v-if="userLogin && is_friend">
			<v-card-title>Messages with @{{ userLogin }} </v-card-title>
			<v-card-text>
				<!-- Chat Messages -->
				<v-list>
					<v-list-item v-for="message in messages" :key="message.id">
						<v-list-item-subtitle>
							{{ message.username }}
							<DateConv :timestamp="message.created_at" />
						</v-list-item-subtitle>
						{{ message.content }}
					</v-list-item>
				</v-list>
			</v-card-text>
		</div>

		<div v-else-if="userLogin">
			<v-card-text> ~ you are not friend with this user so u cant chat ~> </v-card-text>
		</div>

		<div v-else>
			<v-card-title>Messages</v-card-title>
			<v-card-text> ~ no friend selected ~ </v-card-text>
		</div>
		<!-- Message Input -->
	</v-card>
	<v-footer rounded="0" elevation="0">
		<v-text-field
			v-model="input"
			placeholder="Type your message..."
			max-length="200"
			variant="solo"
			rounded="0"
			flat
			append-inner-icon="fas fa-paper-plane"
			@keyup.enter="sendMessage"
			@click:append-inner="sendMessage"
			density="compact"
			clearable
		/>
	</v-footer>

	<!-- Error handling -->
	<Snackbar></Snackbar>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';
import DateConv from '../../utils/DateConv.vue';

import { useSocketStore } from '../../../stores/websocket';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
		DateConv,
	},
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		const webSocketStore = useSocketStore();
		const socket = computed(() => webSocketStore.getSocket);
		const isConnected = computed(() => webSocketStore.isConnected);

		return {
			JWT,
			user,
			isConnected,
			socket,
		};
	},
	props: {
		selectedUserLogin: String,
		refresh: Number,
		challengedUserLogin: String,
	},
	mounted() {},
	data() {
		return {
			userLogin: this.selectedUserLogin ? (this.selectedUserLogin as string) : ('' as string),
			messages: [] as any,
			input: '' as string,
			is_friend: false as boolean,
			challengeLogin: this.challengedUserLogin ? (this.challengedUserLogin as string) : ('' as string),
			challengeIntro: "Let's play pong together ! Follow this link : " as string,
			challengeLink: '' as string,
		};
	},
	watch: {
		selectedUserLogin: function (newVal: string) {
			this.userLogin = newVal;
			this.fetchDirectMessages();
			this.sendSocket(newVal);
		},
		refresh: function () {
			this.fetchDirectMessages();
		},
		isConnected: function (newVal: boolean) {
			if (newVal === true && this.socket) {
				console.log(`[DirMsg-WebSocket] on`);
				if (this.userLogin)	this.sendSocket(this.userLogin);
				this.socket.on('new-direct-message', (data: any) => {
					const msg: any = JSON.parse(data);
			//		console.log(`[DirMSg-WebSocket] 'new-dir-message' -> '${data}'`);
					if (msg !== undefined) {
						this.messages.push(msg);
					} else console.log('Error direct msg failed');
				});
			}
		},
		challengedUserLogin: function (newVal: string) {
			this.challenge(newVal);
		},
	},
	methods: {
		sendSocket: async function (data) {
				    if (this.socket && this.isConnected === true) {
					    this.socket.emit('user-selected', data);
			//		    console.log(`[DirMsg-WSckt] 'user-selected': ${data}`);
				    }
				
			
			    },
		fetchDirectMessages: async function () {
			try {
				if (!this.userLogin || this.userLogin === '') {
					console.log('[fetchDirectMessages]: userLogin is empty');
					return;
				}

				// Check if selected user is a friend
				const isFriend: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends/isfriend/${
						this.userLogin
					}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					},
				);
				if (!isFriend.ok) {
					const error = await isFriend.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const isFriendData: any = await isFriend.json();
				if (!isFriendData.isFriend) {
					this.is_friend = false;
					return;
				}
				this.is_friend = true;

				// Fetch messages
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/${
						this.userLogin
					}/all`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					},
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();

				this.messages = data;
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},

		sendMessage: async function (challengeLink?: string) {
			try {
				if (!this.userLogin || this.userLogin === '' || (!challengeLink && this.input.trim() === '')) {
					return;
				}
				if (!this.is_friend) {
					snackbarStore.showSnackbar('You are not friend with this user.', 3000, 'red');
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/send`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							target_login: this.userLogin,
							content: this.input,
						}),
					},
				);

				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				const data = await response.json();

				this.fetchDirectMessages();
				this.input = '';
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},

		challenge: async function (login: string) {
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.JWT}`,
					'Access-Control-Allow-Origin': '*',
				},
			};

			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/createPrivateGame`,
					requestOptions,
				);
				snackbarStore.hideSnackbar();
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data = await response.json();

				this.challengeLink = `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/game/${data.uid}`;
				this.challenge = this.challengeIntro + this.challengeLink;
				console.log('challenge: ', this.challenge);
			} catch (error: any) {
				snackbarStore.showSnackbar("Can't create game.", 3000, 'red');
			}
			try {
			const response2: any = await fetch(
				`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/send`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${this.JWT}`,
						'Access-Control-Allow-Origin': '*',
					},
					body: JSON.stringify({
						target_login: this.userLogin,
						content: this.challenge,
					}),
				},
			);

			if (!response2.ok) {
				const error = await response2.json();
				snackbarStore.showSnackbar(error.message, 3000, 'red');
				return;
			}

			const data2 = await response2.json();
			console.log ('data2: ', data2);

			this.fetchDirectMessages();
			this.challengeLink = '';
			//this.$router.push({ name: `Game`, params: { uid: data.uid } });
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
};
</script>

<style scoped>
.v-card {
	border: black solid thin;
	border-radius: 0;
	max-height: 82dvh;
	height: 82dvh;
	scroll-behavior: auto;
	overflow-y: scroll;
	overflow-x: hidden;
}

.v-footer {
	border-right: black solid thin;
	border-left: black solid thin;
	border-bottom: black solid thin;
}

.div {
	border-right: black solid thin;
	border-left: black solid thin;
}
</style>

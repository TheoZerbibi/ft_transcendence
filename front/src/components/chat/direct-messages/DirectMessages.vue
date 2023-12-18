<template>
	<v-card>
		<div v-if="selectedUserLogin && is_friend">
			<v-card-title>Messages with @{{ selectedUserLogin }} <span style="color: green">{{ isConnected }}</span> </v-card-title>

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

		<div v-else-if="selectedUserLogin">
			<v-card-text class="empty-card"> ~ you are not friend with this user so u cant chat ~> </v-card-text>
		</div>

		<div v-else>
			<v-card-title>Messages</v-card-title>
			<v-card-text class="empty-card"> ~ no friend selected ~ </v-card-text>
		</div>
		<!-- Message Input -->
	</v-card>
	<v-footer>
		<v-text-field
			v-model="input"
			placeholder="Type your message..."
			max-length="200"
			variant="solo"
			class="elevation-0"
			append-inner-icon="fas fa-paper-plane"
			@keyup.enter="sendMessage"
			@click:append-inner="sendMessage"
			density="compact"
			clearable
			rounded="0"
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
			socket,
			isConnected,
		};
	},
	props: {
		selectedUserLogin: String,
	},
	mounted() {
		//		console.log(`[DirMsg-Socket] state: ${isConnected.value}`);
		//	       this.socket.on('new-direct-message', (data) => {
		//			       const msg: any = JSON.parse(data);
		//			       if (msg !== undefined)
		//			       console.log (`new-direct-msg - msg: ${msg.content}`);
		//			       else
		//				console.log('Error direct msg failed');
		//
		//			       });
	},
	data() {
		return {
			userLogin: this.selectedUserLogin ? (this.selectedUserLogin as string) : ('' as string),
			messages: [] as any,
			input: '' as string,
			is_friend: false as boolean,
		};
	},
	watch: {
		selectedUserLogin: function (newVal: string) {
			this.userLogin = newVal;
			this.fetchDirectMessages();
		},
		isConnected: function (newVal: boolean) {
			console.log(`[DirMsg-Socket] state: ${newVal}`);
		},
	},
	methods: {
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

		sendMessage: async function () {
			try {
				if (!this.userLogin || this.userLogin === '' || this.input.trim() === '') {
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
	},
};
</script>

<style scoped>
.scrollable-content {
	height: 70vh;
	overflow-y: auto;
}

.v-card {
	border: black solid thin;
	border-radius: 0;
	max-height: 87dvh;
	scroll-behavior: auto;
	overflow-y: scroll;
	overflow-x: hidden;
}
</style>

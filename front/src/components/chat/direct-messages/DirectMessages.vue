<template>

	<v-card>

		<v-card-title>Messages with @{{ selectedFriendLogin }} </v-card-title>

		<v-card-text>

			<!-- Chat Messages -->
			<v-list>
				<v-list-item v-for="message in messages" :key="message.id">
					<v-list-item-subtitle>
						{{ message.username }}
						<DateConv :timestamp="message.created_at"/>
					</v-list-item-subtitle>
					{{ message.content }}
				</v-list-item>
			</v-list>

		</v-card-text>

		<!-- Message Input -->
		<v-card-actions>
			<v-text-field
				v-model="input"
				placeholder="Type your message..."
				@keyup.enter="sendMessage"
			/>
			<v-btn
				class="justify-end"
				@click="sendMessage"
				>Send
			</v-btn>
		</v-card-actions>

	</v-card>

	<!-- Error handling -->
	<Snackbar></Snackbar>

</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';
import DateConv from '../../utils/DateConv.vue';

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

		return {
			JWT,
			user,
		};
	},
	props: {
		selectedFriendLogin: String,
	},
	data() {
		return {
			friendLogin: this.selectedFriendLogin ?
												this.selectedFriendLogin as string 
												: '' as string,
			messages: [] as any,
			input: '' as string,
		};
	},
	watch: {
		selectedFriendLogin: function(newVal: string) {
			this.friendLogin = newVal;
			this.fetchDirectMessages();
		},
	},
	methods: {
		fetchDirectMessages: async function() {
			try {
				if (!this.friendLogin || this.friendLogin === '') {
					console.log('[fetchDirectMessages]: friendLogin is empty');
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/${this.friendLogin}/all`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.messages = await response.json();
			} catch (error) {
				console.error(error);
			}
		},

		sendMessage: async function() {
			try {
				if (!this.friendLogin || this.friendLogin === ''
					|| this.input.trim() === '') {
					return;
				}
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/send`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							target_login: this.friendLogin,
							content: this.input,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.fetchDirectMessages();
				this.input = '';
			} catch (error) {
				console.error(error);
			}
		},
	},
};

</script>

<template>

	<!-- If channel selected -->
	<div v-if="selectedChannelName">
		<v-card-title>Messages on {{ selectedChannelName }}</v-card-title>

		<!-- Messages -->
		<v-card-text>
			<v-list>
				<v-list-item v-for="message in messages" :key="message.id">
					<v-list-item-subtitle>
						{{ message.username }}
						{{ message.created_at }}
					</v-list-item-subtitle>
					{{ message.content }}
				</v-list-item>
			</v-list>
		</v-card-text>

		<!-- Input -->
		<v-card-actions>
			<v-text-field
				v-model="input"
				placeholder="Type your message..."
				max-length="200"
				@keyup.enter="sendMessage"
			/>
			<v-btn
				class="justify-end"
				@click="sendMessage"
				>Send
			</v-btn>
		</v-card-actions>
	</div>

	<!-- Else if no channel selected -->
	<div v-else>
		<v-card-title>Messages</v-card-title>
		<v-card-text class="empty-card">
			~ no channel selected ~
		</v-card-text>
	</div>

	<!-- Error handling -->
	<Snackbar></Snackbar>

</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
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
		selectedChannelName: String
	},
	data() {
		return {
			channelName: this.selectedChannelName,
			messages: [] as any[],
			input: '' as string,
		};
	},
	watch: {
		selectedChannelName: function(newVal: string) {
			this.channelName = newVal;
			this.fetchMessages();
		}
	},
	methods: {
		fetchMessages: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[ChannelMessages]: No channel name');
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.channelName}/access/messages`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
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
		sendMessage: async function() {
			try {
				if (!this.channelName || this.channelName === '' 
					|| this.input.trim() === '') {
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.channelName}/new_message`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							content: this.input,
						}),
					}
				);
				if (!response.ok) {
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}

				this.fetchMessages();
				this.input = '';

			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
	},
};

</script>

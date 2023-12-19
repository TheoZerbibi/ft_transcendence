<template>
	<div class="div d-flex flex-row align-center">
		<v-card-title>#{{ selectedChannelName }}</v-card-title>
		<v-spacer></v-spacer>
		<v-icon class="mr-2 hoverable" icon="fas fa-info-circle" color="black" @click=""></v-icon>
	</div>
	<v-card>
		<!-- If channel selected -->
		<div v-if="selectedChannelName">

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

		</div>

		<!-- Else if no channel selected -->
		<div v-else>
			<v-card-text>
				~ no channel selected ~
			</v-card-text>
		</div>
	</v-card>
	<v-footer rounded="0" elevation="0">
		<v-text-field v-model="input" placeholder="Type your message..." max-length="200" variant="solo" rounded="0" flat
			append-inner-icon="fas fa-paper-plane" @keyup.enter="sendMessage" @click:append-inner="sendMessage"
			density="compact" clearable />
	</v-footer>
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
		selectedChannelName: String,
		refresh: Number,
	},
	emits: ['ask-refresh'],
	data() {
		return {
			channelName: this.selectedChannelName,
			messages: [] as any[],
			input: '' as string,
		};
	},
	watch: {
		selectedChannelName: function (newVal: string) {
			this.channelName = newVal;
			this.fetchMessages();
		},
		refresh: function() {
			this.fetchMessages();
		}

	},
	emits: ['open-profile'],
	methods: {
		fetchMessages: async function () {
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
		sendMessage: async function () {
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
		openProfile: function () {
			this.$emit('open-profile', this.selectedUserLogin)
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
<template>
	<v-container>

		<!-- Chat Messages -->
		<v-row>
			<v-col cols="11">
				<v-card>
				<v-card-title>{{ selectedChannelName }}</v-card-title>
					<v-list>
						<v-list-item v-for="message in messages" :key="message.id">
							<v-list-item-subtitle>
								{{ message.username }}
								{{ message.created_at }}
							</v-list-item-subtitle>
							{{ message.content }}
						</v-list-item>
					</v-list>
				</v-card>
			</v-col>
		</v-row>

		<!-- Message Input -->
		<v-row>
			<v-col cols="11">
				<v-card class="pa-4">
					<v-row>
						<v-col cols="9">
							<input v-model="input" @keyup.enter="sendMessage" placeholder="Type you message..." />
						</v-col>
						<v-col cols="1">
							<button @click="sendMessage">-></button>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>

	</v-container>

	<!-- Error handling -->
	<Snackbar></Snackbar>

</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

import Snackbar from '../../layout/Snackbar.vue';
import Date from '../../utils/Date.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
		Date,
	},
	props: {
		selectedChannelName: String
	},
	setup(props) {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		const messages = ref([]);
		const fetchMessages = async function() {
			try {
				console.log("[Message.vue:fetchMessages] selectedChannelName: " + props.selectedChannelName);
				if (!props.selectedChannelName || props.selectedChannelName === '') {
					/* TODO : display stg ? */
					return;
				}
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${props.selectedChannelName}/access/messages`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${JWT.value}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				messages.value = await response.json();
			} catch (error) {
				console.error(error);
			}
		};
		watch(
			() => props.selectedChannelName,
			() => {
				fetchMessages();
			}
		);
		return {
			JWT,
			user,
			fetchMessages,
			messages,
		};
	},
	data: () => ({
		input: String,
	}),
	beforeMount() {
	},
	mounted() {
		this.fetchMessages();
		this.input = '';
	},
	methods: {
		sendMessage: async function() {
			try {
				if (!this.selectedChannelName || this.selectedChannelName === '') {
					/* TODO : display stg ? */
					return;
				}
				if (this.input.trim() === '') {
					return;
				}
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.selectedChannelName}/new_message`,
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
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.input = '';
				this.fetchMessages();
			} catch (error) {
				console.error(error);
			}
		},
	},
};

</script>

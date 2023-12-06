<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<!-- Chat Messages -->
				<v-card class="pa-3" height="400" style="overflow-y: auto;">
					<v-list>
						<v-list-item v-for="message in messages" :key="message.id">
							<v-list-item-avatar>
								<v-img :src="message.avatar"></v-img>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title>{{ message.sender }}</v-list-item-title>
								<v-list-item-subtitle>{{ message.text }}</v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action>
								<v-chip small>{{ message.time }}</v-chip>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<!-- Message Input -->
				<v-card class="pa-3">
					<v-row>
						<v-col cols="10">
							<v-text-field
								v-model="newMessage"
								label="Type a message"
								solo
								flat
								hide-details
							></v-text-field>
						</v-col>
						<v-col cols="2">
							<v-btn color="primary" @click="sendMessage">Send</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	props: {
		friendLogin: String,
	},
	data() {
		return {
			messages: [],
		};
	},
	beforeMount() {
	},
	mounted() {
		this.fetchMessages();
	},
	methods: {
		fetchMessages: async function() {
			try {
				const response = await fetch(
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
				const data = await response.json();
				this.messages = data;
			} catch (error) {
				console.error(error);
			}
		},
		sendMessage: async function() {
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/${this.friendLogin}`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							target: this.friendLogin,
							content: this.newMessage,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				const data = await response.json();
				this.messages.push(data);
			} catch (error) {
				console.error(error);
			}
		},
	},
};

</script>

<style scoped>

</style>
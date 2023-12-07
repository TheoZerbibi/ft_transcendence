<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<!-- Chat Messages -->
				<v-card class="pa-3" height="400" style="overflow-y: auto;">
					<v-list>
						<v-list-item v-for="message in messages" :key="message.id">
							<v-list-title>{{ message.user_name }}</v-list-title>
							<v-list-item-subtitle> {{ message.created_at }} </v-list-item-subtitle>
							{{ message.content }}
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
								input="text"
								placeholder="Type a message"
								solo
								flat
								hide-details
								clearable
							></v-text-field>
						</v-col>
						<v-col cols="1">
							<v-btn @click="sendMessage(input); input=''">Send</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	props: {
		selected_friend_login: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			messages: [],
		};
	},
	setup(props) {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		const messages = ref([]);

		const fetchMessages = async function() {
			try {
				console.log("selected_friend_login: " + props.selected_friend_login);
				if (!props.selected_friend_login || props.selected_friend_login === '') {
					/* TODO : display stg ? */
					return;
				}
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/${props.selected_friend_login}/all`,
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
			() => props.selected_friend_login,
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
	beforeMount() {
	},
	mounted() {
		this.fetchMessages();
	},
	methods: {

		sendMessage: async function(content: string) {
			try {
				await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							target: this.selected_friend_login,
							content: content,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				this.fetchMessages();
			} catch (error) {
				console.error(error);
			}
		},
	},
};

</script>

<style scoped>

</style>
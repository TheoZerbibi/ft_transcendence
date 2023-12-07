<template>
	<v-container>
			<v-row>
				<v-col cols="11">
					<!-- Chat Messages -->
					<v-card class="scrollable-content" style="overflow-y: auto;">
						<v-list>
							<v-list-item v-for="message in messages" :key="message.id">
								<v-list-item-subtitle>
									{{ message.user_name }}
									{{ message.created_at }}
								</v-list-item-subtitle>
								{{ message.content }}
							</v-list-item>
						</v-list>
					</v-card>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="11">
					<!-- Message Input -->
					<v-card class="pa-4">
						<v-row>
							<v-col cols="9">
								<v-text-field
									v-model="input"
									input="text"
									placeholder="Type a message"
									solo
									flat
									hide-details
									outlined
									clearable
								></v-text-field>
							</v-col>
							<v-col cols="1">
								<v-btn @click="sendMessage">Send</v-btn>
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
	setup(props) {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		let messages = ref([]);
		let input = ref('');

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
					snackbarStore.showSnackbar(error, 2999, 'red');
					return;
				});
				messages.value = await response.json();
				input.value = '';
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
			input,
		};
	},
	beforeMount() {
	},
	mounted() {
		this.fetchMessages();
	},
	methods: {

		sendMessage: async function() {
			try {
				if (this.input.trim() === '') {
					return;
				}
				console.log("selected_friend_login: " + this.selected_friend_login + "\ninput: " + this.input);
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
							target: this.selected_friend_login,
							content: this.input,
						}),
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 2999, 'red');
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

.scrollable-content {
	height: 70vh;
	overflow-y: auto;
}


</style>
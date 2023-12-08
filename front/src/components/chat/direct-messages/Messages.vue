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
<!-- HTML VERSION -->
<!--
 						<div class="messages">
							<div v-for="message in messages" :key="message.id" class="message">
								{{ message.user_name }}
								{{ message.created_at }}
								{{ message.content }}
							</div>
						</div>
-->
					</v-card>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="11">
					<!-- Message Input -->
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

		const fetchMessages = async function() {
			try {
				console.log("[Message.vue:fetchMessages] selected_friend_login: " + props.selected_friend_login);
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
				if (!this.selected_friend_login || this.selected_friend_login === '') {
					/* TODO : display stg ? */
					return;
				}
				if (this.input.trim() === '') {
					return;
				}
				console.log("[Message.vue:sendMessage] selected_friend_login: " + this.selected_friend_login
								+ "\ntype: " + this.selected_friend_login.type 
								+ "\ninput: " + this.input
								+ "\ntype: " + this.input.type);
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
							target_login: this.selected_friend_login,
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
				console.log(error.message);
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
<template>

	<v-container
	fluid
	fill-height
	>
	<v-card>
		<v-card-title>Messages</v-card-title>

		<v-card-text>
			<!-- Chat Messages -->
			<v-list>
				<v-list-item
					v-for="message in messages"
					:key="message.id"
				>
					<v-card :class="{'justify-end': message.username == user.display_name, 'justify-start': message.username != user.display_name}">
						<v-card-title>
							{{ message.username }}
							<DateConv :timestamp="message.created_at"/>
						</v-card-title>
						<v-card-text>
							{{ message.content }}
						</v-card-text>
					</v-card>
				</v-list-item>
			</v-list>
			<!-- <v-row>
				<v-col>
					<v-card>
						<v-list>
							<v-list-item v-for="message in messages" :key="message.id">
								<v-list-item-subtitle>
									{{ message.username }}
									<DateConv :timestamp="message.created_at"/>
								</v-list-item-subtitle>
								{{ message.content }}
							</v-list-item>
						</v-list>
					</v-card>
				</v-col>
			</v-row> -->

			<!-- Message Input -->
			<v-row>
				<v-col>
					<v-text-field v-model="input" placeholder="Type you message..."/>
					<v-btn class="justify-end" @click="sendMessage">Send</v-btn>
				</v-col>
			</v-row>

		</v-card-text>
	</v-card>
	</v-container>
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
	props: {
		loginMessages: String
	},
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	data() {
		return {
			input: '' as string,
			messages: [] as any,
		};
	},
	watch: {
		loginMessages(newVal) {
			this.fetchMessages(newVal);
			console.log("[Message.vue:watch:loginMessages]" 
						+ "newVal: " + newVal
						+ "user.display_name: " + this.user.display_name
						+ "messages[0].username: " + this.messages[0].username
						);
		},
	},
	methods: {
		fetchMessages: async function(login: string) {
			try {
				if (!login || login === '') {
					/* TODO : display stg ? */
					return;
				}
				const response = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/directMessage/${login}/all`,
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
				if (!this.loginMessages || this.loginMessages === '') {
					/* TODO : display stg ? */
					return;
				}
				if (this.input.trim() === '') {
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
							target_login: this.loginMessages,
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

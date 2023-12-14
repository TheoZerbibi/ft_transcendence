<template>

	<v-card>
		<v-card-title>Messages</v-card-title>
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


			<!-- Message Input -->
			<v-row>
				<v-col>
					<v-text-field
						v-model="message.input"
						placeholder="Type you message..."
						@keyup.enter="sendMessage(message.input)"
					/>
					<v-btn class="justify-end" @click="sendMessage">Send</v-btn>
				</v-col>
			</v-row>

		</v-card-text>
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
	props: {
		messages: Object,
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
			messagesList: null as any,
			message: {
				input: '' as string,
				id: 0 as number,
			},
		};
	},
	watch: {
		messages(newVal) {
			try {
				this.messagesList = newVal;
				const obj = this.messagesList[0] ? this.messagesList[0] : null;
				if (obj) {
					this.message.id = obj.user_id == this.user.id ? obj.friend_id : obj.user_id;
				}
			} catch (error) {
				console.error(error);
			}
		},
	},
	methods: {
		fetchMessages() {
			this.$emit('messages-with', this.id);
		},
		sendMessage(message: string) {
			if (message) {
				this.$emit('send-message', message);
				this.message.input = '';
			}
		},
	},
};

</script>

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

<script>
export default {
	props: {
		messages: Array,
	},
	data() {
		return {
			newMessage: '',
		};
	},
	methods: {
		sendMessage() {
			if (this.newMessage.trim() !== '') {
				this.$emit('send-message', this.newMessage);
			}
			this.newMessage = '';
		},
	},
};
</script>
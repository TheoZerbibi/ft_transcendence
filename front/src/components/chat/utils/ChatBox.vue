<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<!-- Chat Messages -->
				<v-card class="pa-3" height="400" style="overflow-y: auto;">
					<v-list>
						<v-list-item v-for="message in messages" :key="message.id">
							<v-list-item-title>{{ message.sender }}</v-list-item-title>
							<v-list-item-subtitle>{{ message.text }}</v-list-item-subtitle>
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
								input="text"
								placeholder="Type a message"
								solo
								flat
								hide-details
							></v-text-field>
						</v-col>
						<v-col cols="1">
							<v-btn @click="sendMessage; new_message = ''">Send</v-btn>
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
			new_message: {
				type: string,
				required: true,
				default: '',
			},
		};
	},
	methods: {
		sendMessage() {
			if (this.new_message.trim() !== '') {
				this.$emit('send-message', this.new_message);
			}
			this.new_message = '';
		},
	},
};
</script>
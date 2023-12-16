<template>
	<v-dialog  width="500">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" text="User moderation"> </v-btn>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card v-if="selectedUser">
			<v-card-title>
				{{ selectedUser.display_name }}
			</v-card-title>
			<v-card-text>
				<!-- Unban / ban -->
				<v-btn v-if="selectedUser.is_banned" @click="unban(selectedUser.login)" >Unban </v-btn>
				<v-btn v-else @click="ban(selectedUser.login)">Ban</v-btn>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
				text="Cancel"
				@click="isActive.value = false"
				></v-btn>
			</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>

<script lang="ts">
export default {
	props: {
		show: Boolean,
		selectedChannelUser: Object,
	},
	emits: ['close-modal'],
	data() {
		return {
			selectedUser: this.selectedChannelUser ? this.selectedChannelUser : {},
		};
	},
	watch: {
		selectedChannelUser: function (newVal: any) {
			this.selectedUser = newVal;
			console.log('selectedChannelUser: ', newVal);
		}
	},
	methods: {
		unban: async function (login: string) {
			console.log('unban: ', login);
		},
		ban: async function (login: string) {
			console.log('ban: ', login);
		},
		mute: async function (login: string, duration: Date) {
			console.log('mute: ', login, duration);
		},
		unmute: async function (login: string) {
			console.log('unmute: ', login);
		},
		kick: async function (login: string) {
			console.log('kick: ', login);
		},
		close() {
			this.$emit('close-modal');
		}
		
	}
};
</script>

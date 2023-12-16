<template>
	<v-dialog width="500">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" text="User moderation"> </v-btn>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card v-if="selectedUser">
			<v-card-title>
				User moderation of {{ selectedUser.display_name }}
			</v-card-title>
			<v-card-text>
				<!-- Unban / ban -->
				<v-btn v-if="selectedUser.is_banned" @click="unban(selectedUser.login)" >Unban </v-btn>
				<v-btn v-else @click="ban(selectedUser.login)">Ban</v-btn>
				<v-btn v-if="selectedUser.is_muted" @click="unmute(selectedUser.login)">Unmute</v-btn>
				<v-btn v-else @click="mute(selectedUser.login, new Date())">Mute</v-btn>
				<v-btn @click="kick(selectedUser.login)">Kick</v-btn>
				<v-btn v-if="!selectedUser.is_admin" @click="promote(selectedUser.login)">Promote</v-btn>
				<v-btn v-else @click="demote(selectedUser.login)">Demote</v-btn>
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
		selectedChannelUser: Object,
		myUser: Object,
	},
	emits: ['close-modal'],
    computed: {
        selectedUser() {
            return this.selectedChannelUser || {
                // valeurs par défaut si selectedChannelUser est null ou undefined
                login: 'fake',
                display_name: 'fake',
                avatar: 'fake',
                is_owner: false,
                is_admin: false,
                is_muted: false,
                is_banned: false,
            };
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

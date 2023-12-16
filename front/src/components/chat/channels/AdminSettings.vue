<template>
	<v-dialog v-model="dialog" max-width="600px">
		<v-card>
			<v-card-title>
				Users
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Rechercher"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>

			<v-card-text>
				<v-list>
					<v-list-item
						v-for="(user, index) in filteredUsers"
						:key="index"
					>
						<v-list-item-content>
							<v-list-item-title>{{ user.name }}</v-list-item-title>
							<v-list-item-subtitle>
								Admin: {{ user.is_admin ? 'Oui' : 'Non' }} | 
								Owner: {{ user.is_owner ? 'Oui' : 'Non' }} |
								Banned: {{ user.is_ban ? 'Oui' : 'Non' }}
							</v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-action>
							<v-btn color="red" @click="banUnbanUser(user)">
								{{ user.is_ban ? 'Unban' : 'Ban' }}
							</v-btn>
							<v-btn color="blue" @click="muteUser(user)">Mute</v-btn>
							<v-btn color="orange" @click="kickUser(user)">Kick</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="close">Fermer</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
export default {
	props: {
		channelUsers: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			dialog: false,
			search: '',
		};
	},
	computed: {
		filteredUsers() {
			return this.channelUsers.filter(user => {
				return user.name.toLowerCase().includes(this.search.toLowerCase());
			});
		}
	},
	methods: {
		banUnbanUser(user) {
			user.is_ban = !user.is_ban;
			// Logique pour ban/unban l'utilisateur
		},
		muteUser(user) {
			// Logique pour mute l'utilisateur
		},
		kickUser(user) {
			// Logique pour kick l'utilisateur
		},
		close() {
			this.dialog = false;
		}
	}
};
</script>

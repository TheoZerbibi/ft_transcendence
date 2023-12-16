<template>
	<v-dialog width="500">
	<template v-slot:activator="{ props }">
		<v-btn v-bind="props" text="Change password"> </v-btn>
	</template>

	<template v-slot:default="{ isActive }">
		<v-card title="Change password">
		<v-card-text>
				<!-- Password modification -->
				<v-text-field
					v-model="pwd.prev"
					label="Prev Password"
					type="password"
					max-length="20"
				></v-text-field>
				<v-text-field
					v-model="pwd.new"
					label="New Password"
					type="password"
					max-length="20"
				></v-text-field>
				<v-text-field
					v-model="pwd.confirm"
					label="Confirm Password"
					type="password"
					max-length="20"
				></v-text-field>
				<v-btn @click="changePassword">Change Password</v-btn>
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
import { computed, ref } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';
import Snackbar from '../../layout/Snackbar.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
	},
	props: {
		show: Boolean,
		selectedChannelName: String
	},
	emits: ['close-modal'],
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
			channelName: this.selectedChannelName,
			pwd: {
				prev: '' as string,
				new: '' as string,
				confirm: '' as string,
			},
		};
	},
	watch: {
		selectedChannelName: function(newVal: string) {
			this.channelName = newVal;
		}
	},
	methods: {
		changePassword: async function() {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[changePassword]: channelName is empty');
					return;
				}
				if (this.pwd.prev === '' && this.pwd.new === '' && this.pwd.confirm === '') {
					return;
				}
				const response: any = await fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/${this.channelName}/settings/owner/pwd`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify({
							prev_pwd: this.pwd.prev,
							new_pwd: this.pwd.new,
							new_pwd_confirm: this.pwd.confirm,
						}),
					}
				)
				if (!response.ok) {
					snackbarStore.showSnackbar(response.statusText, 3000, 'red');
					return;
				}
				const data = await response.json();
				if (data.is_error) {
					snackbarStore.showSnackbar(data.error_message, 3000, 'red');
					return;
				}
			} catch (error: any) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
		cancel() {
			this.$emit('close-modal');
		},
	},
}
</script>
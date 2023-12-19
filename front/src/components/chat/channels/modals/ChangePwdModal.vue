<template>
	<v-dialog>
		<template v-slot:activator="{ props }">
			<v-btn flat
			rounded="0"
			style="border: black solid thin;"
			:ripple="false" 
			class="align-self-end"
			v-bind="props" text="Change password"> </v-btn>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card title="Change password" class="rounded-0">
				<v-card-text>
					<!-- Password modification -->
					<v-text-field v-model="pwd.prev" label="Current Password" type="password" variant="solo" rounded="0"
						flat density="compact" clearable></v-text-field>
					<v-text-field v-model="pwd.new" label="New Password" type="password" variant="solo" rounded="0"
						flat density="compact" clearable></v-text-field>
					<v-text-field v-model="pwd.confirm" label="Confirm Password" type="password" variant="solo" rounded="0"
					@keyup.enter="changePassword"
						flat density="compact" clearable></v-text-field>
				</v-card-text>

				<v-spacer></v-spacer>
				<v-card-actions class="d-flex flex-column align-center justify-center">
					<v-btn flat rounded="0" :ripple="false" @click="changePassword" text='Change Password'></v-btn>
					<v-btn flat rounded="0" :ripple="false" text="Cancel" @click="isActive.value = false"></v-btn>
				</v-card-actions>

			</v-card>
		</template>
	</v-dialog>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useUser } from '../../../../stores/user';
import { useSnackbarStore } from '../../../../stores/snackbar';
import Snackbar from '../../../layout/Snackbar.vue';

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
			pwd: {
				prev: '' as string,
				new: '' as string,
				confirm: '' as string,
			},
		};
	},
	computed: {
		channelName: function () {
			return this.selectedChannelName;
		}
	},
	methods: {
		changePassword: async function () {
			try {
				if (!this.channelName || this.channelName === '') {
					console.log('[changePassword]: channelName is empty');
					return;
				}
				if (this.pwd.prev === '' && this.pwd.new === '' && this.pwd.confirm === '') {
					return;
				}
				console.log(this.pwd);
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
					const error = await response.json();
					snackbarStore.showSnackbar(error.message, 3000, 'red');
					return;
				}
				const data = await response.json();
				snackbarStore.showSnackbar(data.message, 3000, 'green');

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

<style scoped>
.v-btn {
	border: black solid thin;
	width: 100%;
	margin-top: 1dvh;
	margin-bottom: 1dvh;
}
</style>
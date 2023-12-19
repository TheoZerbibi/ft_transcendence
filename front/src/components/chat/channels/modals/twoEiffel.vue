<template>
	<v-dialog>
		<template v-slot:activator="{ props }">
			<v-btn 
			flat
			rounded="0"
			:ripple="false" 
			width="100%"
			class="align-self-end"
			v-bind="props" 
			text="Change password"> </v-btn>
		</template>

		<template v-slot:default="{ isActive }">
			<v-card title="Change password" class="rounded-0">
				<v-card-text>
					<!-- Password modification -->
					<v-text-field v-model="pwd.prev" label="Current Password" type="password" variant="outlined" rounded="0"
						flat density="compact" clearable></v-text-field>
					<v-text-field v-model="pwd.new" label="New Password" type="password" variant="outlined" rounded="0"
						flat density="compact" clearable></v-text-field>
					<v-text-field v-model="pwd.confirm" label="Confirm Password" type="password" variant="outlined" rounded="0"
					@keyup.enter="changePassword"
						flat density="compact" clearable></v-text-field>
				</v-card-text>

				<v-card-actions class="align-center justify-center">
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
import QrcodeVue from 'qrcode.vue';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	components: {
		Snackbar,
		QrcodeVue,
	},
	props: {
		show: Boolean,
		selectedChannelName: String
	},
	emits: ['close-modal'],
	setup() {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		const is2FA = computed(() => userStore.is2FA);

		return {
			JWT,
			user,
			is2FA,
		};
	},
	data() {
		return {
			qrCode: null,
		};
	},
	computed: {
		channelName: function () {
			return this.selectedChannelName;
		}
	},
	methods: {
		enable2FA: async function() {
			try {
				console.log('[PROFILE SETTINGS: ENABLE 2FA TODO');
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
	display: flex;
	position: relative;
}
</style>
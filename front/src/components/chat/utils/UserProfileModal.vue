<template>
	<v-row v-if="userData">
		<v-dialog v-model="dialog">
			<v-card>
				<v-card-title>
					<span class="text-h5">{{userData.login}}</span>
				</v-card-title>
				<v-card-text>Modale</v-card-text>
				{{ userData }}
				<button @click="close" class="close-button">X</button>
			</v-card>
		
		</v-dialog>
	</v-row>"
	<Snackbar></Snackbar>
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
		userData: Object,
		show: Boolean,
	},
	emits: ['close'],
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
			data: null as any,
			dialog: this.show,
		};
	},
	watch: {
		userData(newVal) {
			this.data = newVal;
		},
		show(newVal) {
			this.dialog = newVal;
		},
	},
	methods: {
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style scoped>
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 1rem;
	border-radius: 0.5rem;
	background-color: red;
	z-index: 100;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-button {
  /* ... */
}
.modal-body {
  display: flex;
  gap: 20px;
}
.user-info {
  flex-basis: 50%;
}
.avatar {
  width: 100%; /* Adjust as needed */
}
.user-stats {
  flex-basis: 50%;
  border: 1px solid #000;
  padding: 10px;
}
.stats-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.block-user, .challenge {
  /* Style for buttons */
}
</style>

<template>
	<div class="overlay" v-if="show">
		<div class="modal">
			<div class="modal-header">
				<h3>@username</h3>
				<button @click="close" class="close-button">X</button>
			</div>
			<div class="modal-body">
				<div class="user-info">
					<img src="avatar.jpg" alt="Avatar" class="avatar"/>
					<h3>displayName</h3>
				</div>
				<div class="user-stats">
					<h4>Stats</h4>
					<div class="stats-details">
						<div class="level">Level 21</div>
						<div class="wins">6 wins</div>
						<div class="loses">6 loses</div>
						<div class="matches">6 matches</div>
					</div>
					<div class="actions">
						<button class="block-user">Block user</button>
						<button class="challenge">Challenge</button>
					</div>
				</div>
			</div>
		</div>
	</div>
<!-- 	<div class="overlay">
		<div class="modal" v-if="show">
			<div class="modal-content" v-if="selected_user">
				<img :src="selected_user.avatar" alt="avatar" />
				<h3>{{ selected_user.display_name }}</h3>
				<p>...infos on user</p>
				<p>...infos on user</p>
				<p>...infos on user</p>
				<button @click="close">Close</button>
			</div>
		</div>
	</div> -->
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useUser } from '../../../stores/user';
import { useSnackbarStore } from '../../../stores/snackbar';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
	props: {
		selected_user_login: {
			type: String,
			default: '',
		},
		show: Boolean,
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
			selected_user: {},
		};
	},
	beforeMount() {
		this.fetchSelectedUserInfos();
	},
	mounted() {},
	methods: {
		fetchSelectedUserInfos: async function() {
			try {
				console.log("[UserProfileModal.vue:fetchSelectedUserInfos]" 
							+ "\nshow_modal: " + this.show 
							+ "\nselected_user_login: " + this.selected_user_login);
				if (!this.show || !this.selected_user_login || this.selected_user_login === '') {
					// TODO : display stg ?
					return;
				}
				const response = await fetch (
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/profile/${this.selected_user_login}`, 
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				console.log("[UserProfileModal.vue:fetchSelectedUserInfos] response: " + response);
				this.selected_user = await response.json();
			} catch (error) {
				console.error(error);
			}
		},
		close() {
			this.$emit('close');
		}
	},
/* 	setup(props) {
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);
		const selected_user = ref({});
		const fetchSelectedUserInfos = async function() {
			try {
				if (!props.show || !props.selected_user_login || props.selected_user_login === '') {
					// TODO : display stg ?
					return;
				}
				const response = await fetch (
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/profile/${props.selected_user_login.value}`, 
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				).catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				selected_user.value = await response.json();
			} catch (error) {
				console.error(error);
			}
			console.log("[Friends.vue:setup(props)] selected_user: " + selected_user.value);
			console.log("[Friends.vue:setup(props)] show: " + props.show);
		};
		return {
			JWT,
			user,
			selected_user,
			fetchSelectedUserInfos,
		};
	},
	beforeMount() {
		console.log("[Friends.vue:beforeMount] selected_user: " + this.selected_user);
		console.log("[Friends.vue:beforeMount] show: " + this.show);
		this.fetchSelectedUserInfos();
	},
	mounted() {},
	methods: {
		close() {
			this.$emit('close');
		}
	}, */
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
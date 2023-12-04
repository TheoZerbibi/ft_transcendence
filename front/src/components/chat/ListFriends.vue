<template>
	<div class="overlay">
		<div class="friends-container">
			<h2>Friends</h2>
			<ul class="no-bullets" v-if="friends.length">
				<li v-for="friend in friends" :key="friend.id">
					<span class="online-badge" v-if="friend.isOnline"></span>
					{{ friend.display_name }}
				</li>
			</ul>
			<p v-else>~ sorry, no friends for now ~</p>
		</div>
	</div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useUser } from '../../stores/user';
import { useSnackbarStore } from '../../stores/snackbar';

const userStore = useUser();
const snackbarStore = useSnackbarStore();

export default {
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
			friends: []
		};
	},
	beforeMount() {
		this.fetchFriends();
	},
	mounted() {},
	methods: {
		fetchFriends: async function() {
			try {
				const response = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/users/friends`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${this.JWT}`,
							'Access-Control-Allow-Origin': '*',
						},
					}
				)
				.catch((error: any) => {
					snackbarStore.showSnackbar(error, 3000, 'red');
					return;
				});
				const data = await response.json();
				this.friends = data;
			} catch (error) {
				console.error(error);
			}
		}
	}
}

</script>


<style scoped>

@font-face {
	font-family: 'OMORI_MAIN';
	src: url('/fonts/OMORI_GAME.ttf') format('truetype-variations');
}

div {
	font-family: 'OMORI_MAIN';
}

h2 {
	font-family: 'OMORI_MAIN', sans-serif;
	font-size: xx-large;
	text-align: center;
	color: rgb(65, 37, 37);
	text-shadow:
		1px 1px 2px plum,
		0 0 1em rgb(255, 123, 255),
		0 0 0.2em rgb(255, 255, 255);
}

.no-bullets {
	list-style-type: none;
}

.friends-container {
	position: absolute;
	top: 10%;
	left: 50%;
	margin: auto;
	background-color: rgb(0, 0, 0, 0.8);
	padding: 1rem;
	border-radius: 1rem;
	overflow: auto;
}

.online-badge {
  height: 10px;
  width: 10px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}

</style>

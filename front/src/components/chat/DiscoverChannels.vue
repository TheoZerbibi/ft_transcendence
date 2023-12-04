<template>
	<div class="overlay">
		 <div class="discover-channels-list-container">
			<h2>Discover Channels</h2>
			<ul class="no-bullets" v-if="discoverChannels.length">
				<li v-for="channel in discoverChannels" :key="channel.id">
					{{ channel.name }}
				</li>
			</ul>
			<p v-else>~ there is no channel to discover ~</p>
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
			discoverChannels: []
		};
	},
	beforeMount() {
		this.fetchDiscoverChannels();
	},
	mounted() {},
	methods: {
		fetchDiscoverChannels: async function() {
			try {
				const response = await
				fetch(
					`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_API_PORT}/channel/list/discover`,
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
				if (data.error) {
					snackbarStore.showSnackbar(data.error, 3000, 'red');
					return;
				}
				this.discoverChannels = data;
			} catch (error) {
				snackbarStore.showSnackbar(error, 3000, 'red');
			}
		},
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
	font-family: 'OMORI_MAIN';
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
	padding-left: 0;
	margin-left: 0;
}

.discover-channels-list-container {
	position: absolute;
	top: 40%;
	left: 5%;
	margin: auto;
	background-color: rgb(0, 0, 0, 0.8);
	padding: 1rem;
	border-radius: 1rem;
	overflow: auto;
}
</style>
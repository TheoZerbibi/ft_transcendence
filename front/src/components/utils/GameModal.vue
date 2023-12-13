<template>
	<v-row v-if="apiData" justify="center">
		<v-dialog v-model="dialog" persistent max-width="80vw">
			<div
				class="overflow-auto d-flex flex-column"
				:style="{
					backgroundImage: 'url(/game/UI/Window.png)',
					backgroundPosition: 'center',
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
					color: 'white',
					height: '80vh',
				}"
			>
				<div class="d-flex justify-space-between align-center mt-n1">
					<!-- Utilisez mt-n1 ou pt-n1 pour ajuster l'espace -->
					<span></span>
					<!-- Élément vide pour équilibrer le flexbox -->
					<h1 class="omoriFont" :style="{
						margin: '0',
					}">Game Summary</h1>
					<v-btn icon @click="closeDialog" class="mr-8" color="transparent" />
				</div>

				<div class="d-flex flex-column align-center justify-center flex-grow-1">
					<div v-if="rightUser" id="rightUser" class="my-2">
						<v-avatar size="10vw">
							<v-img :src="rightUser.user.avatar" />
						</v-avatar>
						<h1 class="omoriArcade">{{ rightUser.score }}</h1>
					</div>
					<div v-if="leftUser" id="leftUser" class="my-2">
						<v-avatar size="10vw">
							<v-img :src="leftUser.user.avatar" />
						</v-avatar>
						<h1 class="omoriArcade">{{ leftUser.score }}</h1>
					</div>
					<div v-if="apiData.startDate" class="my-2">
						Start at: <DateViewer :timestamp="apiData.startDate" />
						<br />
						Duration: {{ duration }}
					</div>
				</div>
			</div>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
import { SIDE } from '../../plugins/game/enums/Side';
import DateViewer from './Date.vue';

export default {
	components: { DateViewer },
	props: {
		apiData: {
			type: Object,
			default: () => ({}),
		},
		isWinner: {
			type: Boolean,
			default: false,
		},
		isVisible: {
			type: Boolean,
			default: false,
		},
		isLoser: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			dialog: false as boolean,
			data: null as any,
			leftUser: null as any,
			rightUser: null as any,
			duration: '' as string,
		};
	},
	watch: {
		apiData(newVal) {
			if (this.isVisible) this.dialog = true;
			this.data = this.processData(newVal);
		},
	},
	methods: {
		closeDialog() {
			this.$router.push({ name: 'GameMenu' });
		},
		processData(data: any) {
			const start: Date = new Date(data.startDate);
			const end = new Date(data.endingDate);
			const durationInMilliseconds = end.getTime() - start.getTime();
			const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((durationInMilliseconds % (1000 * 60)) / 1000);
			if (minutes > 0) this.duration = `${minutes} minutes ${seconds} seconds`;
			else this.duration = `${seconds} seconds`;

			if (data.winner.side === SIDE.LEFT) {
				this.leftUser = data.winner;
				this.rightUser = data.loser;
			} else {
				this.leftUser = data.loser;
				this.rightUser = data.winner;
			}
			return data;
		},
	},
};
</script>

<template>
	<v-row v-if="apiData" justify="center">
		<v-dialog v-model="dialog" persistent width="800">
			<v-card>
				<v-card-title>
					<span class="text-h5">Stats</span>
				</v-card-title>
				<v-card-text>bsoir.</v-card-text>
				{{ apiData }}
				<br />
				left {{ leftUser }}
				<br />
				right {{ rightUser }}
				<br />
				{{ isWinner }}
				{{ isLoser }}
				<div v-if="leftUser" id="leftUser">
					<v-avatar size="100">
						<img :src="leftUser.user.avatar" />
					</v-avatar>
					{{  leftUser.score }}
				</div>
				<div v-if="rightUser" id="rightUser">
					<v-avatar size="100">
						<img :src="rightUser.user.avatar" />
					</v-avatar>
					{{ rightUser.score }}
				</div>
				<div v-if="apiData.startDate">
					Start at : <Date :timestamp="apiData.startDate" />
					<br />
					Durée : {{ duration }}
				</div>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
import { SIDE } from '../../plugins/game/enums/Side';
import Date from '../layout/Date.vue';

export default {
	components: { Date },
	props: {
		isWinner: Boolean,
		isLoser: Boolean,
		apiData: Object,
		dialogValue: Boolean,
	},
	data() {
		return {
			dialog: this.dialogValue,
			data: null as any,
			leftUser: null as any,
			rightUser: null as any,
			duration: '' as string,
		};
	},
	watch: {
		apiData(newVal) {
			this.data = this.processData(newVal);
		},
		dialogValue(newVal) {
			this.dialog = newVal;
		},
	},
	methods: {
		processData(data: any) {
			console.log('data', data);
			const start = new Date(data.startDate);
			const end = new Date(data.endingDate);
			console.log(data);
			const durationInMilliseconds = end.getTime() - start.getTime();
			const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((durationInMilliseconds % (1000 * 60)) / 1000);
			this.duration = `${minutes} minutes ${seconds} seconds`;

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

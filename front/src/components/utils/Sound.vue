<template>
	<audio controls id="myVideo" autoplay loop hidden>
		<source :src="sound" type="audio/wav" />
		Your browser does not support the audio element.
	</audio>
</template>

<script lang="ts">
export default {
	name: 'Sound',
	props: {
		folder: String,
	},
	data() {
		return {
			sound: '' as string,
		};
	},
	beforeMount() {
		const soundList: string[] = [];
		let sounds = undefined;
		console.log(this.folder);
		switch (this.folder) {
			case '/sounds/404':
				sounds = import.meta.glob('/public/sounds/404/*.mp3');
				break;
			case '/sounds/game/ai':
				sounds = import.meta.glob('/public/sounds/game/ai/*.mp3');
				break;
			case '/sounds/game/versus':
				sounds = import.meta.glob('/public/sounds/game/versus/*.mp3');
				break;
			default:
				break;
		}
		if (!sounds) return;
		for (const path in sounds) {
			soundList.push(path);
		}
		console.log(soundList);
		if (soundList.length === 0) return;
		this.sound = soundList[Math.floor(Math.random() * soundList.length)];
		this.sound = this.sound.replace('/public', '');
	},
};
</script>

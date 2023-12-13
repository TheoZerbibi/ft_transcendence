import { defineStore } from 'pinia';

export const useBackgroundColorStore = defineStore({
	id: 'background',
	state: () => ({
		backgroundColor: 'black',
	}),
	actions: {
		setBackgroundColor(color: string) {
			this.backgroundColor = color;
		},
	},
});

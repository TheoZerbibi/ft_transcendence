import { defineStore } from 'pinia';

export const useBackgroundColorStore = defineStore({
	id: 'background',
	state: () => ({
		backgroundColor: 'black',
	}),
	getters: {
		getBackgroundColor: (state) => state.backgroundColor,
	},
	actions: {
		setBackgroundColor(color: string) {
			this.backgroundColor = color;
		},
	},
});

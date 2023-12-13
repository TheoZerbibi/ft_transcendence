import { defineStore } from 'pinia';

export const useBackgroundColorStore = defineStore({
  id: 'background',
  state: () => ({
    backgroundColor: 'black', // Initial background color
  }),
  actions: {
    setBackgroundColor(color) {
      this.backgroundColor = color;
    },
  },
});

import { defineStore } from 'pinia';
export const useCountdownStore = defineStore('countdown', {
    state: () => ({
        seconds: 0,
        overlayOpen: false,
    }),
    actions: {
        setSeconds(seconds) {
            this.seconds = seconds;
        },
    },
});

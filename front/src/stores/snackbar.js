import { defineStore } from 'pinia';
export const useSnackbarStore = defineStore({
    id: 'snackbar',
    state: () => ({
        snackbar: false,
        text: '',
        timeout: 3000,
        color: 'primary',
    }),
    actions: {
        showSnackbar(text, timeout = 3000, color = 'primary') {
            this.snackbar = true;
            this.text = text;
            this.timeout = timeout;
            this.color = color;
        },
        hideSnackbar() {
            this.snackbar = false;
        },
    },
});

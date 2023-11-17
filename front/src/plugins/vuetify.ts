// Styles
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify"

export default createVuetify({
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			mdi,
			fa
		},	
	},
})

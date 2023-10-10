// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@fortawesome/fontawesome-free/css/all.css';
import '@mdi/font/css/materialdesignicons.css';
import {aliases, fa} from 'vuetify/iconsets/fa';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify({
	theme: {
		defaultTheme: 'dark',
	},
	icons: {
		defaultSet: 'fa',
		aliases,
		sets: {
			fa,
		}	
	}
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

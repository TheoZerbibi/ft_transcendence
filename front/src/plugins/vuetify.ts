// Styles
<<<<<<< HEAD
import '@mdi/font/css/materialdesignicons.css';
=======
import 'vuetify/styles';
>>>>>>> 790bb55 (nav bar to fix)
import '@fortawesome/fontawesome-free/css/all.css';
import { fa } from 'vuetify/iconsets/fa';
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import 'vuetify/styles';
import '@fontsource-variable/dancing-script';
import '@fontsource-variable/pixelify-sans';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify({
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
			fa,
		},
	},
	icons: {
		defaultSet: 'fa',
		aliases,
		sets: {
			fa,
		}	
	}
});

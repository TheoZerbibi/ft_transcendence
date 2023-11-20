// Styles
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'vuetify/styles';
import '@fontsource-variable/dancing-script';
import '@fontsource-variable/pixelify-sans';

import { createVuetify } from 'vuetify';
import { fa } from 'vuetify/iconsets/fa';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

export default createVuetify({
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
			fa,
		},
	},
});

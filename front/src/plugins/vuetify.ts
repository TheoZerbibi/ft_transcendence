// Styles
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'
import {aliases, fa} from 'vuetify/iconsets/fa'
import 'vuetify/styles'
>>>>>>> 9e87f6d (tuto)
=======
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import "vuetify/styles";
>>>>>>> c9c7a2b (halloween colors)

// Vuetify
import { createVuetify } from "vuetify"

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
export default createVuetify(
	{
		icons: {
			defaultSet: 'fa',
			aliases,
			sets: {
>>>>>>> 9e87f6d (tuto)
			fa,
			}	
		}
	}
<<<<<<< HEAD
});
=======
)
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
>>>>>>> 9e87f6d (tuto)
=======
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
>>>>>>> c9c7a2b (halloween colors)

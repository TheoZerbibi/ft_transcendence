import 'vuetify/styles';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

<<<<<<< HEAD
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

=======
>>>>>>> c80165e (fix: github issue)
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';
import { loadFonts } from './plugins/webfontloader';
import router from './router';

<<<<<<< HEAD
// Importing the global css file
<<<<<<< HEAD
<<<<<<< HEAD
import './assets/global.css';
=======
import "./assets/global.css"
>>>>>>> 452e6ff (page team prototype done)

const vuetify = createVuetify({
	theme: {
<<<<<<< HEAD
		defaultTheme: 'dark',
=======
		defaultTheme: "dark",
>>>>>>> c9c7a2b (halloween colors)
=======
import './assets/global.css';

const vuetify = createVuetify({
	theme: {
		defaultTheme: 'dark',
>>>>>>> 3b9f6f4 (clean files)
	},
=======
const vuetify = createVuetify({
>>>>>>> c80165e (fix: github issue)
	components,
	directives,
});

loadFonts();

<<<<<<< HEAD
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

createApp(App).use(router).use(vuetify).use(pinia).mount('#app');
=======
createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app');
>>>>>>> c80165e (fix: github issue)

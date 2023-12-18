import 'vuetify/styles';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import piniaPersist from 'pinia-plugin-persist';
import VueCookies from 'vue-cookies';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';
import { loadFonts } from './plugins/webfontloader';
import './plugins/vuetify';
import router from './router';

// Importing the global css file
import './assets/global.css';

const omoriTheme = {
	background: '#000000',
	surface: '#000000',
	primary: 'ffffff',
	secondary: '#ffffff',
	accent: '#000000',
	error: '#ff0000',
	info: '#3399ff',
	success: '#33ff33',
	warning: '#ff8000',
}


const vuetify = createVuetify({
	name: 'App',
	data() {
		return {};
	},
	theme: {
		defaultTheme: 'omoriTheme',
		themes: {
			omoriTheme,
		},
	},
	components,
	directives,
	icons: {
		defaultSet: 'mdi',
	},
});

loadFonts();

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);

app.use(router).use(vuetify).use(VueCookies).use(pinia).mount('#app');

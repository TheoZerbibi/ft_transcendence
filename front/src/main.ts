import 'vuetify/styles';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';
import { loadFonts } from './plugins/webfontloader';
import router from './router';

// Importing the global css file
import './assets/global.css';

const vuetify = createVuetify({
	theme: {
		defaultTheme: 'dark',
	},
	components,
	directives,
});

loadFonts();

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

createApp(App).use(router).use(vuetify).use(pinia).mount('#app');

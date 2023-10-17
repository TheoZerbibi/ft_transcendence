import 'vuetify/styles';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';
import { loadFonts } from './plugins/webfontloader';
import router from './router';

const vuetify = createVuetify({
	components,
	directives,
});

loadFonts();

createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app');

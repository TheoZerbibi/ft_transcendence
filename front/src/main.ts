import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { loadFonts } from './plugins/webfontloader';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const vuetify = createVuetify({
    components,
    directives,
});

loadFonts();

createApp(App).use(router).use(vuetify).mount('#app');

<template>
	<v-app>
		<v-main id="background">
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { createApp } from 'vue';
import { createVuetify } from 'vuetify/lib/framework.mjs';
import { md2 } from 'vuetify/blueprints'

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

export default createVuetify({
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
});
</script>

<template>
	<v-row align="center" justify="center" class="fill-height" id="background">
	</v-row>
	<Footer />
</template>

<script lang="ts">
import Footer from '../components/layout/Footer.vue';

export default {
	name: 'HomeView',
	components: { Footer },
};
</script>

<style>
#background {
	background-image: url('/src/assets/OmoriWallpapers/OmoriHeadSpace.png');
}
</style>

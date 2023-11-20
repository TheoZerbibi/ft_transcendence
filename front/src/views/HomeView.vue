<template>
	<v-row align="center" justify="center" class="fill-height" id="background">
	</v-row>
	<Footer />
</template>

<script lang="ts">
import Footer from '../components/utils/Footer.vue';
import { makeid } from '../plugins/makeId';

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

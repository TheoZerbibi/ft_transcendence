<template>
	<v-app id="home">
		<NavBar>
			<v-container fluid>
				<div class="head">

				</div>
			</v-container>
		</NavBar>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import NavBar from '../components/utils/NavBar.vue';

export default defineComponent({
	name: 'Home',

	components: {
		NavBar	
	},
});
</script>

<style scoped>
.v-container{
	padding: 16px 0;
}
.head{
	position: relative;
	text-align: center;
	padding: 12px;
	margin-bottom: 6px;
	height: 400px;
	width: 100%;
	color: white;
}
.head:before{
	content: " ";
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 50%;
	background: black;
	transform: skew(0deg, 6deg);
}
</style>

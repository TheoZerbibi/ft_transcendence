<template>
	<v-app id="home">
		<NavBar>
			<v-container fluid>
				<div class="head">
					<v-row>
						<v-col cols="5">
							<div style="position: relative" clas="mt-16">
								<h1 class="text-grey">Hello,</h1>
								<h1 class="text-grey">Welcome to ft_transcendence of</h1>
								<span class="text-grey">Théo, Gaëlle, Semiha, Noémie and Norminet</span><br />
								<v-btn title dark class="text-yellow mt-8" variant="outlined"></v-btn>
							</div>
						</v-col>
					</v-row>
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
	name: 'HomeView',

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
.head.after{
	content: " ";
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 50%;
	background: black;
	transform: skew(0deg, -6deg);
}
</style>

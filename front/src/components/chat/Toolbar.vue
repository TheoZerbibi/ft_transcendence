<template>
  <div class="Toolbar">
	<v-app-bar>
		<v-responsive max-width="100%" class="container">
			<v-row align="left" justify="end">
				<v-col cols="12" sm="6" md="4">
					<InputBar></InputBar>
				</v-col>
			</v-row>
		</v-responsive>
	</v-app-bar>
  </div>
</template>

<script lang="ts">
import InputBar from '../layout/InputBar.vue';

export default {
  name: 'Toolbar',
  components: {
	InputBar,
},
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 16px;
}
</style>
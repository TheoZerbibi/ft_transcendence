<template>
	<v-dialog v-model="dialog" max-width="500px"/>
		<v-card>
			<v-card-title class="headline">Privacy Policy</v-card-title>
			<v-card-text>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus illo iusto velit, facilis odio vero
					quas nesciunt iste soluta ut qui praesentium veniam atque quos ipsam similique eum modi impedit?</p>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="dialog = false">I accept</v-btn>
			</v-card-actions>
		</v-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Popup',
	data: () => ({
		dialog: true,
	}),
});
</script>

<style></style>
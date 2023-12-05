<template>
	<div class="modal" v-if="show">
		<h2>{{ user.display_name }}</h2>
		<p>"infos on user"</p>
		<button @click="close">x</button>
	</div>
</template>

<script lang="ts">
export default {
	props: {
		user: Object,
		show: Boolean,
	},
	methods: {
		close() {
			this.$emit('close');
		}
	}
};
</script>

<style scoped>
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 1rem;
	border-radius: 0.5rem;
	background-color: white;
}
</style>

<style scoped>

</style>
<template>
	<div class="overlay">
		<div class="modal" v-if="show">
			{{ user.display_name }}
			<p>...infos on user</p>
			<p>...infos on user</p>
			<p>...infos on user</p>
			<button @click="close">Close</button>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	props: {
		user: {},
		show: Boolean,
	},
	beforeMount() {
		console.log("user: " + this.user);
		console.log("show: " + this.show);
	},
	mounted() {},
	methods: {
		close() {
			this.$emit('close');
		}
	},
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
	background-color: deeppink;
	z-index: 100;
}
</style>

<style scoped>

</style>
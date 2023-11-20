<template>
	<div>
		<v-btn color="primary" @click="openDialog">Open Dialog</v-btn>
		<Modal :title="dialogTitle" :text="dialogText" :dialogValue="dialogVisible" />
	</div>
</template>

<script lang="ts">
	import Modal from '../components/utils/GameModal.vue';

	export default {
		components: {
			Modal,
		},
		data() {
			return {
				dialogTitle: 'Titre par défaut',
				dialogText: 'Contenu par défaut',
				dialogVisible: false,
			};
		},
		methods: {
			openDialog() {
				this.dialogVisible = true;
			},
		},
	};
</script>

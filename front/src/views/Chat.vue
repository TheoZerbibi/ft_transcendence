<template>
	<v-app id="inspire">
		<Chat></Chat>
	</v-app>
</template>

<script lang="ts">
import { useUser } from '../stores/user';
import Chat from '../components/chat/Chat.vue';
import { computed } from 'vue';

export default {
	name: 'ChatView',
	components: { Chat },
	setup() {
		const userStore = useUser();
		const JWT = computed(() => userStore.getJWT);
		const user = computed(() => userStore.getUser);

		return {
			JWT,
			user,
		};
	},
	beforeMount() {
		if (!this.JWT || !this.user) {
			return this.$router.push({ name: `Login` });
		}
	},
};
</script>

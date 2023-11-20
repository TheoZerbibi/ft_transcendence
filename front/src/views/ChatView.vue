<template>
	<v-app id="inspire">

		<SystemBar></SystemBar>

		<AvatarsBar></AvatarsBar>

		<ChannelList></ChannelList>

		<Toolbar></Toolbar>

		<MessageInput></MessageInput>

		<v-main><!--  --></v-main>

		<OnlineList></OnlineList>

	</v-app>
</template>

<script>

import AvatarsBar from '../components/chat/AvatarsBar.vue';
import ChannelList from '../components/chat/ChannelList.vue';
import MessageInput from '../components/chat/MessageInput.vue';
import OnlineList from '../components/chat/OnlineList.vue';
import SystemBar from '../components/chat/SystemBar.vue';
import Toolbar from '../components/chat/Toolbar.vue';

export default {
	name: "Chat",
	components: {
		AvatarsBar,
		ChannelList,
		MessageInput,
		OnlineList,
		SystemBar,
		Toolbar,
	},
}
</script>
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

import AvatarsBar from './AvatarsBar.vue';
import ChannelList from './ChannelList.vue';
import MessageInput from './MessageInput.vue';
import OnlineList from './OnlineList.vue';
import SystemBar from './SystemBar.vue';
import Toolbar from './Toolbar.vue';

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

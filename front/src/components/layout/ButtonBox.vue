<template>
	<Box class="hovarable" @click="handleClick" :width="width" :height="height">
		<slot></slot>
	</Box>
</template>

<script>
import { defineComponent } from 'vue';
import Box from './Box.vue';

export default defineComponent({
	name: "ButtonBox",
	components: {
		Box
	},
	props: {
		width: {
			type: String,
			default: '100px'
		},
		height: {
			type: String,
			default: '50px'
		},
		onClick: {
			type: Function,
			default: () => {}
		}
	},
	methods: {
		handleClick() {
			this.onClick();
		}
	}
});
</script>
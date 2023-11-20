<template>
	<v-footer class="darkNeonPolice footer blurred-card" alt="Footer">
		<span style="color: black"> ☆⋆｡𖦹°‧★ </span>
		<a class="darkNeonPolice" href="https://www.instagram.com/42.born2code/" target="_blank">Instagram</a>
		<span style="color: black"> 👁 </span>
		<a class="darkNeonPolice" href="https://www.facebook.com/42born2code" target="_blank">Facebook</a>
		<span style="color: black"> 👁 </span>
		<a class="darkNeonPolice" href="https://twitter.com/42born2code?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank"
			>Twitter</a
		>
		<span style="color: black"> ☆⋆｡𖦹°‧★ </span>
	</v-footer>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'Footer',
	});
</script>

<style scoped>
.footer {
	display: block;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	padding-top: 14px;
	padding-bottom: 14px;
	padding-left: 24px;
	height: 36px;
	text-align: center;
}
</style>
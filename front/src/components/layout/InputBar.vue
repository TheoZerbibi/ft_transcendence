<template>
	<input type="text" name="text" class="input omoriPolice" placeholder="Type your text" v-model="input" />
</template>

<script lang="ts">
export default {
	name: 'InputBar',
	data() {
		return {
			input: '',
		};
	},
};
</script>

<style scoped>
.input {
	background-color: #383838;
	border: 1ex solid none;
	border-top-width: 1.7em;
	margin: 10px;
	padding: 0;
	color: #383838;
	word-wrap: break-word;
	outline: 7px solid #383838;
	height: 30px;
	font-size: 17px;
	text-align: center;
	-webkit-transition: all 1s;
	transition: all 1s;
	max-width: 100%;
	font-weight: bold;
}

.input:hover {
	border-top-width: 0.2em;
	background-color: #f1e8e8;
}

.input:focus {
	border-top-width: 0.2em;
	background-color: #f1e8e8;
}
</style>

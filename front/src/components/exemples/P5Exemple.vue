<template>
	<div id="app">
		<h1>VueJS + p5.js Test</h1>
		<div id="exemple-canvas" />
	</div>
</template>

<script lang="ts">
import P5 from 'p5';

export default {
	name: 'P5Exemple',
	mounted() {
		const script = function (p5: any) {
			var speed = 2;
			var posX = 35;

			p5.setup = () => {
				const canvas = p5.createCanvas(500, 500);
				canvas.parent('exemple-canvas');
			};
			p5.draw = () => {
				p5.background(51);
				const degree = p5.frameCount * 3;
				const y = p5.sin(p5.radians(degree)) * 50;

				p5.push();
				p5.translate(0, p5.height / 2);
				p5.fill(66, 184, 131);
				p5.stroke(53, 73, 94);
				p5.strokeWeight(5);
				p5.ellipse(posX, y, 50, 50);
				p5.pop();
				posX += speed;

				if (posX > p5.width - 35 || posX < 35) {
					speed *= -1;
				}
			};
		};
		new P5(script);
	},
};
</script>

<style scoped>
body,
html {
	margin: 0;
	padding: 0;
}

#app {
	margin-top: 60px;
	color: #dddfe2;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#vue-canvas {
	display: block;
	margin: 0 auto;
	padding: 0;
	width: 500px;
	height: 500px;
	border-radius: 20px;
	overflow: hidden;
}
</style>

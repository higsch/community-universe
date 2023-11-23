<script>
	import { onMount, onDestroy, setContext } from 'svelte';

	export let width = 0;
	export let height = 0;
	export let center = false;
	export let contextName = 'canvas';

	const drawFunctions = [];

	// adapted from https://github.com/Wattenberger/svelte-recipes/blob/master/src/components/examples/scale-canvas.js
	const scaleCanvas = (canvas, ctx, width, height, center = true) => {
		// assume the device pixel ratio is 1 if the browser doesn't specify it
		const devicePixelRatio = window.devicePixelRatio || 1;

		// determine the 'backing store ratio' of the canvas ctx
		const backingStoreRatio =
			ctx.webkitBackingStorePixelRatio ||
			ctx.mozBackingStorePixelRatio ||
			ctx.msBackingStorePixelRatio ||
			ctx.oBackingStorePixelRatio ||
			ctx.backingStorePixelRatio ||
			1;

		// determine the actual ratio we want to draw at
		const ratio = devicePixelRatio / backingStoreRatio;

		if (devicePixelRatio !== backingStoreRatio) {
			// set the 'real' canvas size to the higher width/height
			canvas.width = width * ratio;
			canvas.height = height * ratio;

			// ...then scale it back down with CSS
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
		} else {
			// this is a normal 1:1 device; just scale it simply
			canvas.width = width;
			canvas.height = height;
			canvas.style.width = '';
			canvas.style.height = '';
		}

		// scale the drawing ctx so everything will work at the higher ratio
		ctx.scale(ratio, ratio);

		if (center) {
			ctx.translate(width / 2, height / 2);
		}
	};

	let canvas;
	let ctx;
	let pendingInvalidation = false;
	let frameId;

	function update() {
		if (!ctx) return;

		if (center) {
			ctx.clearRect(-width / 2, -height / 2, width, height);
		} else {
			ctx.clearRect(0, 0, width, height);
		}

		drawFunctions.forEach((fn) => {
			ctx.save();
			fn(ctx);
			ctx.restore();
		});

		pendingInvalidation = false;
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
	});

	onDestroy(() => {
		if (frameId) {
			cancelAnimationFrame(frameId);
		}
	});

	$: setContext(contextName, {
		register(fn) {
			drawFunctions.push(fn);
		},
		deregister(fn) {
			drawFunctions.splice(drawFunctions.indexOf(fn), 1);
		},
		invalidate() {
			if (pendingInvalidation) return;
			pendingInvalidation = true;
			frameId = requestAnimationFrame(update);
		},
	});

	$: if (canvas && ctx) scaleCanvas(canvas, ctx, width, height, center);
</script>

<canvas
	bind:this={canvas}
	on:mousemove
/>
<slot />

<style>
	canvas {
		position: var(--position);
		z-index: var(--z-index);
	}
</style>

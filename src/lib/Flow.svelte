<script>
	import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';

  export let data;
  export let color;
  export let strokeWidth;
  export let opacity;
	export let contextName = 'canvas';

	const { register, deregister, invalidate } = getContext(contextName);

	function draw(ctx) {
		ctx.strokeStyle = color;
		ctx.globalAlpha = opacity;
		ctx.lineWidth = strokeWidth;

    const p = new Path2D(data);

		ctx.beginPath();
		ctx.stroke(p);
	}

	onMount(() => {
		register(draw);
		invalidate();

		return () => {
			deregister(draw);
		};
	});

	afterUpdate(invalidate);

	onDestroy(invalidate);
</script>

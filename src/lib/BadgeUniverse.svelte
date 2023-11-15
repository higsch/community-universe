<script>
	import { scaleLinear, forceSimulation, forceCollide, forceCenter } from 'd3';

	import Badge from '$lib/Badge.svelte';

	export let data;

	let width, height;
	let simulationCounter = 0;
	let renderedData = [];

	$: dimensionScale = scaleLinear()
		.domain([0, 1])
		.range([width * height / 20000, width * height / 10000]);

	$: scaledData = data.map((d) => {
		return {
			...d,
			x: width / 2,
			y: height / 2,
			r: dimensionScale(Math.random()) + 10,
		};
	});

	$: if (scaledData && scaledData.length && width)
		forceSimulation()
			.nodes(scaledData)
			.force(
				'collision',
				forceCollide((d) => d.r + 10)
			)
			.force('center', forceCenter((width || 0) / 2, (height || 0) / 2))
			.on('tick', () => {
				for (let i = 0; i < scaledData.length; i++) {
					const d = scaledData[i];
					d.x = Math.max(d.r, Math.min(width - d.r, d.x));
					d.y = Math.max(d.r, Math.min(height - d.r, d.y));
				}
			})
			.on('end', () => {
				renderedData = scaledData;
			})
			.alphaMin(0.5);
</script>

<div
	class="badge-universe"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	{#if width}
		{#each renderedData as { x, y, r, data }}
			<div
				class="badge-container"
				style:top="{y}px"
				style:left="{x}px"
			>
				<Badge
					data={data}
					width={r * 2}
					spin
				/>
			</div>
		{/each}
	{/if}
</div>

<style>
	.badge-universe {
		width: 100%;
		height: 80vh;
		min-height: 400px;
		max-height: 500px;
	}

	.badge-container {
		position: absolute;
		transform: translateX(-50%) translateY(-50%);
    transition: all 0.5s ease-in-out;
	}
</style>

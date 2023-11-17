<script>
	import { scalePow, forceSimulation, forceCollide } from 'd3';

	import Badge from '$lib/Badge.svelte';

	export let data;
	export let height;

	let width;
	let renderedData = [];

	$: dimensionScale = scalePow()
		.domain([0, 1])
		.range([width * height / 20000, width * height / 5000])
		.exponent(3);

	$: scaledData = data.map((d) => {
		const isAlenkaOrMatthias = d.user_id < 0;
		const isAlenka = isAlenkaOrMatthias && d.user_name === 'Alenka';
		const isMatthias = isAlenkaOrMatthias && d.user_name === 'Matthias';
		return {
			...d,
			x: width * Math.random(),
			y: height * Math.random(),
			r: (isAlenkaOrMatthias ? dimensionScale(1) : dimensionScale(Math.random() / 2)) + 10,
			fx: isAlenka ? width / 4 : isMatthias ? (3 * width) / 4 : undefined,
			fy: isAlenka || isMatthias ? height / 2 : undefined,
		};
	});

	$: if (scaledData && scaledData.length && width)
		forceSimulation()
			.nodes(scaledData)
			.force(
				'collision',
				forceCollide((d) => d.r)
			)
			// .force('center', forceCenter((width || 0) / 2, (height || 0) / 2))
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
		position: absolute;
		z-index: 100;
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

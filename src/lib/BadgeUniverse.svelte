<script>
	import { scalePow, scaleLinear, scaleSqrt } from 'd3';

	import { layoutForce } from '$utils/force';

	import Badge from '$lib/Badge.svelte';
	import CareerImage from '$lib/CareerImage.svelte';

	export let uuid;
	export let data;
	export let height;
	export let showLegend = false;

	const padding = 20;

	let width;
	let renderedData = [];

	$: xScale = scaleLinear()
		.domain([0, 1])
		.range([padding, width - padding]);

	$: yScale = scaleSqrt()
		.domain([0, 1])
		.range([height - padding, padding]);

	$: scaledData = data.map((d) => {
		const isAlenkaOrMatthias = d.user_id === '-1';
		const isAlenka = isAlenkaOrMatthias && d.user_name === 'Alenka';
		const isMatthias = isAlenkaOrMatthias && d.user_name === 'Matthias';
		return {
			...d,
			x: isAlenka
				? width / 4
				: isMatthias
				  ? (3 * width) / 4
				  : xScale(Math.random()),
			y: isAlenka || isMatthias ? height / 2 : yScale(Math.random()),
			targetY: isAlenka || isMatthias ? height / 2 : yScale(Math.random()),
			r: isAlenkaOrMatthias
				? width / 7
				: d.user_id === uuid
				  ? width / 12
				  : Math.max(50, width / 20),
			isAlenkaOrMatthias,
			fx: isAlenka ? width / 4 : isMatthias ? (3 * width) / 4 : undefined,
			fy: isAlenka || isMatthias ? height / 2 : undefined,
			isGlowing: d.user_id === uuid,
			name: d.user_name,
		};
	});

	$: if (scaledData && scaledData.length && width) {
		(async () =>
			(renderedData = await layoutForce({
				data: scaledData,
				width,
				height,
			})))();
	}
</script>

<div
	class="badge-universe"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	{#if width}
		{#each renderedData as { x, y, r, data, name, isAlenkaOrMatthias, isGlowing }}
			<div
				class="badge-container"
				class:transition={!isAlenkaOrMatthias}
				style:top="{y}px"
				style:left="{x}px"
				style:z-index={isAlenkaOrMatthias ? 100 : isGlowing ? 300 : 200}
			>
				<Badge
					data={data}
					name={name}
					width={r * 2}
					spin={!isAlenkaOrMatthias}
					isGlowing={isGlowing}
				/>
			</div>
		{/each}
	{/if}
	{#if showLegend}
		<CareerImage
			x="50%"
			y="90%"
			src="img/dvs_badge_legend.png"
			alt="Career"
			dimension="{Math.max(300, Math.min(675, width / 3))}px"
		/>
	{/if}
</div>

<style>
	.badge-universe {
		position: absolute;
		z-index: 100;
		width: 100%;
		height: 80vh;
		min-height: 400px;
		max-height: 1000px;
	}

	.badge-container {
		position: absolute;
		transform: translateX(-50%) translateY(-50%);
	}

	.badge-container:hover {
		z-index: 300 !important;
	}

	.badge-container.transition {
		transition: all 0.5s ease-in-out;
	}
</style>

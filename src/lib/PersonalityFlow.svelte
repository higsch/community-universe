<script>
	import { scaleLinear, extent, line, curveBumpX } from 'd3';
	import { personalityColors, personalityHeight } from '$utils/config';
	import { createStack, reduceLayers, createSubStack } from '$utils/stack';

	import YearLabels from '$lib/YearLabels.svelte';

	export let data;
	export let universeHeight;
	export let strokeWidth = 1.0;
	export let yearLabels = false;

	let width, height;
	let renderedData = [];
	let yearScale, thicknessScale;

	const lineGenerator = line()
		.x((d) => d[0])
		.y((d) => d[1])
		.curve(curveBumpX);

	$: stackedData = createStack({ data });
	$: reducedData = reduceLayers({ data: stackedData, scale: 0.9 });
	$: substackedData = createSubStack({
		data: reducedData,
		scale: 3,
	});

	$: if (
		stackedData &&
		stackedData.length &&
		width &&
		height &&
		universeHeight
	) {
		yearScale = scaleLinear()
			.domain(extent(data, (d) => d.year))
			.range([personalityHeight + universeHeight, universeHeight]);

		thicknessScale = scaleLinear()
			.domain(
				extent(stackedData.map((d) => d.map((dd) => [dd[0], dd[1]])).flat(2))
			)
			.range([0, width]);

		renderedData = substackedData.map((lineStack, i) => {
			const coords = lineStack.data.map((d) =>
				d.map((dd) => [
					yearScale(dd[0]),
					thicknessScale(dd[1]) + (Math.random() - 1) * 3,
				])
			);
			const extendedCoords = coords.map((d) => [
				...d,
				[width / 2, universeHeight / 2].reverse(),
			]);
			return {
				id: i,
				paths: extendedCoords.map((d) => lineGenerator(d)),
				color: personalityColors[lineStack.key],
			};
		});
	}
</script>

<div
	class="personality-flow"
	bind:clientWidth={width}
	bind:clientHeight={height}
	style:--universeHeight="{universeHeight}px"
	style:--personalityHeight="{personalityHeight}px"
	style:--tailHeight="{1000}px"
>
	<svg
		width={width}
		height={height}
	>
		<defs>
			<linearGradient
				id="dim-gradient"
				gradientTransform="rotate(90)"
			>
				<stop
					offset="0%"
					stop-color="var(--background-color)"
					stop-opacity="1.0"
				/>
				<stop
					offset="50%"
					stop-color="var(--background-color)"
					stop-opacity="1.0"
				/>
				<stop
					offset="70%"
					stop-color="var(--background-color)"
					stop-opacity="0.9"
				/>
				<stop
					offset="80%"
					stop-color="var(--background-color)"
					stop-opacity="0.7"
				/>
				<stop
					offset="100%"
					stop-color="var(--background-color)"
					stop-opacity="0.0"
				/>
			</linearGradient>
		</defs>
		<g style:--maxThickness="{thicknessScale?.range()[1] / 2}px">
			{#each renderedData as { id, paths } (id)}
				<path
					d={paths}
					fill="none"
					stroke="white"
					stroke-width={strokeWidth}
					opacity="0.9"
				/>
			{/each}
			{#each renderedData as { id, paths, color } (id)}
				<path
					d={paths}
					fill="none"
					stroke={color}
					stroke-width={strokeWidth}
					opacity="0.7"
				/>
			{/each}
		</g>
		<rect
			x="0"
			y="0"
			width={width}
			height={universeHeight}
			fill="url('#dim-gradient')"
		/>
	</svg>
	{#if yearLabels && yearScale}
		<YearLabels scale={yearScale} />
	{/if}
</div>

<style>
	.personality-flow {
		flex: 1;
		position: relative;
		min-height: calc(var(--universeHeight) + var(--personalityHeight) + var(--tailHeight));
	}

	svg {
		position: absolute;
		top: 0;
		left: 0;
	}

	g {
		transform: translate(calc(50% + var(--maxThickness, 0)), 0%) rotate(90deg);
	}
</style>

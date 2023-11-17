<script>
	import {
		scaleLinear,
		extent,
		line,
		curveBumpX,
	} from 'd3';
	import { personalityColors } from '$utils/config';
	import { createStack, reduceLayers, createSubStack } from '$utils/stack';

	export let data;
	export let universeHeight;
	export let strokeWidth = 1.0;
	export let labels = false;

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
		scale: 4,
	});

	$: if (stackedData && stackedData.length && width && height && universeHeight) {
		yearScale = scaleLinear()
			.domain(extent(data, (d) => d.year))
			.range([height, universeHeight]);

		thicknessScale = scaleLinear()
			.domain(
				extent(stackedData.map((d) => d.map((dd) => [dd[0], dd[1]])).flat(2))
			)
			.range([0, width / 1.1]);

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
>
	<svg
		width={width}
		height={height}
	>
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
	</svg>
</div>

<style>
	.personality-flow {
		width: 100%;
		min-height: calc(var(--universeHeight) + 2000px);
		overflow: hidden;
	}

	g {
		transform: translate(calc(50% + var(--maxThickness, 0)), 0%) rotate(90deg);
	}
</style>

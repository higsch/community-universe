<script>
	import { stack, union, index, scaleLinear, extent, area, stackOffsetSilhouette, curveBumpX } from 'd3';

	export let data;

	let width, height;
	let renderedData = [];
	let yearScale, thicknessScale;

	const createStack = (data) => {
		return stack()
			.keys(union(data.map((d) => d.role)))
			.value(([, d], key) => d.get(key).value)
			.offset(stackOffsetSilhouette)(
			index(
				data,
				(d) => d.year,
				(d) => d.role
			)
		);
	};

	$: stackedData = createStack(data);

	$: if (stackedData && stackedData.length && width && height) {
		yearScale = scaleLinear()
			.domain(extent(data, (d) => d.year))
			.range([height, 0]);

		thicknessScale = scaleLinear()
			.domain(
				extent(stackedData.map((d) => d.map((dd) => [dd[0], dd[1]])).flat(2))
			)
			.range([0, width / 1.1]);

		const areaGenerator = area()
			.x((d) => yearScale(d.data[0]))
			.y0((d) => thicknessScale(d[0]))
			.y1((d) => thicknessScale(d[1]))
			.curve(curveBumpX);

		renderedData = stackedData.map((d) => areaGenerator(d));
	}
</script>

<div
	class="personality-flow"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<svg
		width={width}
		height={height}
	>
		<g
			style:--maxThickness="{thicknessScale?.range()[1] / 2}px"
		>
			{#each renderedData as d}
				<path
					d={d}
					fill="pink"
					stroke="black"
				/>
			{/each}
		</g>
	</svg>
</div>

<style>
	.personality-flow {
		width: 100%;
		min-height: 2000px;
		overflow: hidden;
	}

	g {
    transform: translate(calc(50% + var(--maxThickness, 0)), 0%) rotate(90deg);
	}
</style>

<script>
	import { stack, union, index, scaleLinear, extent, area, stackOffsetSilhouette, curveBumpX } from 'd3';

	export let data;

	let width, height;
	let renderedData = [];

	const createStack = (data) => {
		return stack()
			.keys(union(data.map((d) => d.role)))
			.value(([, D], key) => D.get(key).value)
			.offset(stackOffsetSilhouette)(
			index(
				data,
				(d) => d.year,
				(d) => d.role
			)
		);
	};

	$: alenka = data.filter((d) => d.name === 'Alenka');
	$: matthias = data.filter((d) => d.name === 'Matthias');

	$: stackedData = createStack(matthias);

	$: if (stackedData && stackedData.length && width && height) {
		console.log(stackedData);
		const yearScale = scaleLinear()
			.domain(extent(data, (d) => d.year))
			.range([height, 0]);

		const thicknessScale = scaleLinear()
			.domain(
				extent(stackedData.map((d) => d.map((dd) => [dd[0], dd[1]])).flat(2))
			)
			.range([0, width / 5]);

		const areaGenerator = area()
			.x((d) => yearScale(d.data[0]))
			.y0((d) => thicknessScale(d[0]))
			.y1((d) => thicknessScale(d[1]))
			.curve(curveBumpX);

		renderedData = stackedData.map((d) => areaGenerator(d));
	}

	$: console.log(renderedData);
</script>

<div
	class="personality-flows"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<svg
		width={width}
		height={height}
	>
		<g
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
	.personality-flows {
		width: 100%;
		min-height: 2000px;
		overflow: hidden;
	}

	g {
    transform: translate(50%, 0%) rotate(90deg);
	}
</style>

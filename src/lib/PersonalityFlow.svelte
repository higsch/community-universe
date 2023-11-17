<script>
	import {
		stack,
		union,
		index,
		scaleLinear,
		extent,
		area,
		line,
		stackOffsetSilhouette,
		curveBumpX,
		interpolateNumber,
	} from 'd3';

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

	const createSubStack = (data, scale = 5) => {
		const nLayers = data.length;
		const positions = data[0].map((d) => d.data[0]);

		const transformed = Array.from({ length: nLayers }).map((_, iLayer) => {
			const layerData = data[iLayer];
			const nLines = Math.max(1, Math.floor(Math.max(...layerData.map(d => Math.abs(d[0] - d[1]))) / scale));
			return Array.from({ length: nLines }).map((_, iLine) => {
				return positions.map((position, iPosition) => {
					const value = interpolateNumber(
						layerData[iPosition][0],
						layerData[iPosition][1]
					)(iLine / nLines);
					return [position, value];
				});
			});
		});

		return transformed;
	};

	$: stackedData = createStack(data);

	$: substackedData = createSubStack(stackedData, 10);

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

		const lineGenerator = line()
			.x((d) => yearScale(d[0]))
			.y((d) => thicknessScale(d[1]))
			.curve(curveBumpX);

		// renderedAreaData = stackedData.map((d) => areaGenerator(d));
		renderedData = substackedData.map((lineStack) => lineStack.map((d) => lineGenerator(d)));
	}

	$: console.log(substackedData);
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
		<g style:--maxThickness="{thicknessScale?.range()[1] / 2}px">
			{#each renderedData as d}
				<path
					d={d}
					fill="none"
					stroke="pink"
					stroke-width="1"
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

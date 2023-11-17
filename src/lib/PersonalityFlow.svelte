<script>
	import {
		stack,
		union,
		index,
		scaleLinear,
		extent,
		line,
		stackOffsetSilhouette,
		curveBumpX,
		interpolateNumber,
	} from 'd3';
	import { personalityColors } from '$utils/config';

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
			const nLines = Math.max(
				1,
				Math.floor(
					Math.max(...layerData.map((d) => Math.abs(d[0] - d[1]))) / scale
				)
			);
			const subData =  Array.from({ length: nLines }).map((_, iLine) => {
				return positions.map((position, iPosition) => {
					const value = interpolateNumber(
						layerData[iPosition][0],
						layerData[iPosition][1]
					)(iLine / nLines);
					return [position, value];
				});
			});
			return {
				data: subData,
				key: layerData.key,
			};
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

		const lineGenerator = line()
			.x((d) => yearScale(d[0]))
			.y((d) => thicknessScale(d[1]) + (Math.random() - 1) * 3)
			.curve(curveBumpX);

		renderedData = substackedData.map((lineStack, i) => {
			return {
				id: i,
				path: lineStack.data.map((d) => lineGenerator(d)),
				color: personalityColors[lineStack.key],
			};
		});
	}

	$: console.log(stackedData);
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
			{#each renderedData as { id, path, color } (id)}
				<path
					d={path}
					fill="none"
					stroke={color}
					stroke-width="1"
					opacity="0.7"
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

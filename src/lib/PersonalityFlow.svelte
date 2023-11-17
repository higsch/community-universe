<script>
	// @ts-nocheck

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
	export let universeHeight;
	export let strokeWidth = 1.0;

	let width, height;
	let renderedData = [];
	let yearScale, thicknessScale;

	const lineGenerator = line()
		.x((d) => d[0])
		.y((d) => d[1])
		.curve(curveBumpX);

	const createStack = ({ data }) => {
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

	const reduceLayers = ({ data, scale = 0.9 }) => {
		return data.map((layer) => {
			const outerReducedData = layer.map((positions) => {
				const interpolator = interpolateNumber(positions[0], positions[1]);
				let reducedData = [interpolator(1 - scale), interpolator(scale)];
				reducedData.data = positions.data;
				return reducedData;
			});
			outerReducedData.key = layer.key;
			outerReducedData.index = layer.index;
			return outerReducedData;
		});
	};

	const createSubStack = ({ data, scale = 4 }) => {
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
			const subData = Array.from({ length: nLines }).map((_, iLine) => {
				const renderedPositions = positions.map((position, iPosition) => {
					const value = interpolateNumber(
						layerData[iPosition][0],
						layerData[iPosition][1]
					)(iLine / nLines);
					return [position, value];
				});
				return renderedPositions;
			});
			return {
				data: subData,
				key: layerData.key,
			};
		});

		return transformed;
	};

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

	$: console.log(universeHeight);
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

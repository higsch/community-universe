<script>
	import { polygon, intersect } from '@turf/turf';
	import { line } from 'd3';

	export let data = [5, 5, 4, 5, 5, 4, 2, 4, 2];
	// data: collection, analysis, cleaning
	// visualization: design, building, storytelling
	// society: leadership, management, community ??
	export let width = 250;
	export let spin = false;

	const radarVertices = (valueArray, scale, rotateRadians = -Math.PI / 2) => {
		const nPoints = valueArray.length;
		const radarPoints = valueArray.map((d, i) => [
			scale * (d + 0.1) * Math.cos(rotateRadians + (2 * Math.PI * i) / nPoints),
			scale * (d + 0.1) * Math.sin(rotateRadians + (2 * Math.PI * i) / nPoints),
		]);
		return radarPoints;
	};

	const turfPoly = (vertices) => polygon([[...vertices, vertices[0]]]);

	$: height = width;
	$: badgeScale = width / 11;

	$: badgePaths = new Map([
		[
			'data',
			{
				fill: '#2db1a4',
				vertices: radarVertices(data.slice(0, 3), badgeScale),
			},
		],
		[
			'visualization',
			{
				fill: '#dcb22a',
				vertices: radarVertices(
					data.slice(3, 6),
					badgeScale,
					(2 * Math.PI * 1) / 9 - Math.PI / 2
				),
			},
		],
		[
			'society',
			{
				fill: '#9f5f9c',
				vertices: radarVertices(
					data.slice(6, 9),
					badgeScale,
					(2 * Math.PI * 2) / 9 - Math.PI / 2
				),
			},
		],
	]);

	$: badgeIntersections = new Map([
		[
			'dv',
			{
				fill: '#1E6E0F',
				vertices: intersect(
					turfPoly(badgePaths.get('data').vertices),
					turfPoly(badgePaths.get('visualization').vertices)
				).geometry.coordinates[0],
			},
		],
		[
			'ds',
			{
				fill: '#153252',
				vertices: intersect(
					turfPoly(badgePaths.get('data').vertices),
					turfPoly(badgePaths.get('society').vertices)
				).geometry.coordinates[0],
			},
		],
		[
			'vs',
			{
				fill: '#773110',
				vertices: intersect(
					turfPoly(badgePaths.get('society').vertices),
					turfPoly(badgePaths.get('visualization').vertices)
				).geometry.coordinates[0],
			},
		],
		[
			'dvs',
			{
				fill: '#11210D',
				vertices: intersect(
					intersect(
						turfPoly(badgePaths.get('data').vertices),
						turfPoly(badgePaths.get('visualization').vertices)
					),
					turfPoly(badgePaths.get('society').vertices)
				).geometry.coordinates[0],
			},
		],
	]);
</script>

<svg
	width={width}
	height={height}
>
	<g
		transform="translate({width / 2} {height / 2})"
		class:spin={spin}
	>
		{#each [...badgePaths.values(), ...badgeIntersections.values()] as { fill, vertices }}
			<path
				d={line()(vertices)}
				fill={fill}
			/>
		{/each}
	</g>
</svg>

<style>
	.spin {
		transform-origin: center center;
		animation: spin 180s linear infinite;
	}

	@keyframes spin {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 360deg;
		}
	}
</style>

<script>
	import { polygon, intersect } from '@turf/turf';
	import { line } from 'd3';
	import { v4 as uuidv4 } from 'uuid';

	export let data = [5, 5, 4, 5, 5, 4, 2, 4, 2];
	// data: collection, cleaning, analysis
	// visualization: building, design, storytelling
	// society: management, community, leadership
	export let name;
	export let width = 250;
	export let spin = false;
	export let isGlowing = false;
	export let showLabel = false;

	const id = uuidv4();

	const radarVertices = (valueArray, scale, rotateRadians = -Math.PI / 2) => {
		const nPoints = valueArray.length;
		const radarPoints = valueArray.map((d, i) => [
			scale * (d + 1) * Math.cos(rotateRadians + (2 * Math.PI * i) / nPoints),
			scale * (d + 1) * Math.sin(rotateRadians + (2 * Math.PI * i) / nPoints),
		]);
		return radarPoints;
	};

	const turfPoly = (vertices) => polygon([[...vertices, vertices[0]]]);

	const spinSwitch = Math.random() > 0.5;

	let badgePaths, badgeIntersections;
	let hasError = false;

	$: height = width;
	$: badgeScale = width / 13;

	$: try {
		badgePaths = new Map([
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
						(2 * Math.PI * 1) / 9 - Math.PI / 2,
					),
				},
			],
			[
				'society',
				{
					fill: '#9f5f9c',
					vertices: radarVertices(
						[data[7], data[8], data[6]],
						badgeScale,
						(2 * Math.PI * 2) / 9 - Math.PI / 2,
					),
				},
			],
		]);
	} catch (e) {
		console.log(e);
		badgePaths = undefined;
	}

	const getIntersectionCoords = (ids, badgePaths) => {
		try {
			if (ids.length === 2) {
				return intersect(
					turfPoly(badgePaths.get(ids[0]).vertices),
					turfPoly(badgePaths.get(ids[1]).vertices),
				).geometry.coordinates[0];
			} else if (ids.length === 3) {
				return intersect(
					intersect(
						turfPoly(badgePaths.get(ids[0]).vertices),
						turfPoly(badgePaths.get(ids[1]).vertices),
					),
					turfPoly(badgePaths.get(ids[2]).vertices),
				).geometry.coordinates[0];
			}
		} catch (e) {
			console.log(e);
			hasError = true;
			return [];
		}
	};

	$: badgeIntersections = new Map([
		[
			'dv',
			{
				fill: '#1E6E0F',
				vertices: getIntersectionCoords(['data', 'visualization'], badgePaths),
			},
		],
		[
			'ds',
			{
				fill: '#153252',
				vertices: getIntersectionCoords(['data', 'society'], badgePaths),
			},
		],
		[
			'vs',
			{
				fill: '#773110',
				vertices: getIntersectionCoords(
					['society', 'visualization'],
					badgePaths,
				),
			},
		],
		[
			'dvs',
			{
				fill: '#11210D',
				vertices: getIntersectionCoords(
					['data', 'visualization', 'society'],
					badgePaths,
				),
			},
		],
	]);

	$: r = width / 2;
</script>

{#if badgePaths && badgeIntersections}
	<svg
		width={width + 12}
		height={height + 12}
		class:has-error={hasError}
		class:show-label={showLabel}
	>
		<defs>
			<filter
				id="glow"
				width="400%"
				height="400%"
				x="-200%"
				y="-200%"
			>
				<feGaussianBlur
					id="feGaussianBlur5384"
					in="SourceAlpha"
					stdDeviation={Math.min(
						10,
						(0.9 * badgeScale) / window.devicePixelRatio,
					)}
					result="blur"
				/>
				<feColorMatrix
					id="feColorMatrix5386"
					result="bluralpha"
					type="matrix"
					values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 0.800000 0 "
				/>
				<feOffset
					id="feOffset5388"
					in="bluralpha"
					dx="0"
					dy="0"
					result="offsetBlur"
				/>
				<feMerge id="feMerge5390">
					<feMergeNode
						id="feMergeNode5392"
						in="offsetBlur"
					/>
					<feMergeNode
						id="feMergeNode5394"
						in="SourceGraphic"
					/>
				</feMerge>
			</filter>
		</defs>
		<g
			transform="translate({6 + width / 2} {6 + height / 2})"
			class:spin={spin && spinSwitch}
			class:spin-reverse={spin && !spinSwitch}
		>
			{#each [...badgePaths.values(), ...badgeIntersections.values()] as { fill, vertices }}
				<path
					d={line()(vertices)}
					fill={fill}
					filter={isGlowing ? 'url(#glow)' : undefined}
				/>
			{/each}
			{#if name}
				<g class="label">
					<path
						id="path-{id}"
						d="M{-r} 0a{r} {r} 0 1 1 {r * 2} 0a{r} {r} 0 1 1 {-2 * r} 0"
						fill="none"
						stroke="white"
					/>
					<text
						font-size="0.8rem"
						dy="5px"
						fill="var(--background-color)"
						stroke="var(--background-color)"
						stroke-width="0.3rem"
						stroke-opacity="1.0"
						text-anchor="middle"
					>
						<textPath
							href="#path-{id}"
							startOffset="25%">{name}</textPath
						>
					</text>
					<text
						font-size="0.8rem"
						dy="5px"
						fill="var(--h1-color)"
						text-anchor="middle"
					>
						<textPath
							href="#path-{id}"
							startOffset="25%">{name}</textPath
						>
					</text>
				</g>
			{/if}
		</g>
	</svg>
{/if}

<style>
	g.label {
		opacity: 0;
		transition: opacity 0.2s linear;
	}

	svg:hover g.label, svg.show-label g.label {
		opacity: 1;
	}

	.spin {
		transform-origin: center center;
		animation: spin 180s linear infinite;
	}

	.spin-reverse {
		transform-origin: center center;
		animation: spin-reverse 180s linear infinite;
	}

	@keyframes spin {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 360deg;
		}
	}

	@keyframes spin-reverse {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: -360deg;
		}
	}
</style>

<script>
	import { scaleLinear, scalePow } from 'd3';

  import { backgroundDotColors} from '$utils/config';

	export let width = 0;
	export let height = 0;

	const numBlurs = 10;

	const numScale = scaleLinear().domain([200, 500]).range([70, 150]);

	const opacityScale = scaleLinear().domain([0, 1]).range([0.6, 1.0]);

	const stdDeviationScale = scaleLinear()
		.domain([0, numBlurs - 1])
		.range([2, 3]);

	const blurIdScale = scaleLinear()
		.domain([0, 1])
		.range([0, numBlurs - 1]);

	const blurs = Array.from({ length: numBlurs }).map((_, i) => {
		return {
			id: i,
			stdDeviation: stdDeviationScale(i),
		};
	});

	$: availableHeight = 1.0 * height;

	$: xScale = scaleLinear().domain([0, 1]).range([0, width]);

	$: yScale = scaleLinear().domain([0, 1]).range([availableHeight, 0]);

	$: radiusScale = scalePow()
		.exponent(3)
		.domain([0, 1])
		.range([2, Math.min(15, Math.min(width, availableHeight) / 2)]);

	$: dots = Array.from({ length: numScale(width) }).map((_, i) => {
		return {
			id: i,
			x: xScale(Math.random()),
			y: yScale(Math.random()),
			r: radiusScale(Math.random()),
			o: opacityScale(Math.random()),
			b: Math.floor(blurIdScale(Math.random())),
      f: backgroundDotColors[Math.floor(Math.random() * backgroundDotColors.length)]
		};
	});
</script>

<svg
	class="dots"
	width={width}
	height={height}
>
	<defs>
		{#each blurs as { id, stdDeviation } (id)}
			<filter id="blur-{id}">
				<feGaussianBlur stdDeviation={stdDeviation} />
			</filter>
		{/each}
	</defs>
	<g>
		{#each dots as { id, x, y, r, o, b, f } (id)}
			<circle
				cx={x}
				cy={y}
				r={r}
				opacity={o}
        fill={f}
				fill-opacity={o}
				filter="url(#blur-{b})"
			/>
		{/each}
	</g>
</svg>

<style>
	svg.dots {
		position: absolute;
		top: 0;
		left: 0;
    z-index: -100;
	}

	g {
		opacity: 0.6;
	}

	circle {
		stroke: none;
	}
</style>

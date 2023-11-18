<script>
	export let scale;

	$: labels = scale.ticks().map((d) => ({
		value: d,
		y: scale(d),
	}));
</script>

<div class="year-labels">
	{#each labels as { value, y }}
		<span
			class="year-label"
			style="top: {y}px;"
		>
			{value}
		</span>
	{/each}
</div>

<style>
	.year-labels {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 200;
	}

	span {
		position: absolute;
		font-size: 0.8rem;
		transform: translateY(-50%);
		text-shadow: 0 0 5px var(--background-color),
			0 0 5px var(--background-color), 0 0 5px var(--background-color),
			0 0 5px var(--background-color);
	}
</style>

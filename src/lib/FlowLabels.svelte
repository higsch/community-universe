<script>
	export let name;
	export let data;
	export let isNarrow = false;
</script>

<g class="flow-labels">
	{#each data as { label, href, offset, color, showMobile }}
		{#if !isNarrow || (isNarrow && showMobile)}
			<text
				font-family="Handlee"
				font-size="1rem"
				dy="7px"
				fill="var(--background-color)"
				stroke="var(--background-color)"
				stroke-width="0.3rem"
				stroke-opacity="1.0"
			>
				<textPath
					href="#{name}-{href}"
					startOffset={offset}>{label}</textPath
				>
			</text>
			<text
				font-family="Handlee"
				font-size="1rem"
				dy="7px"
				fill="var(--h1-color)"
			>
				<textPath
					href="#{name}-{href}"
					startOffset={offset}>{label}</textPath
				>
			</text>
		{/if}
	{/each}
</g>

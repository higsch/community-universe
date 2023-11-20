<script>
	export let name;
  export let data;
</script>

<g class="flow-labels">
	{#each data as { label, href, offset, color }}
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
	{/each}
</g>

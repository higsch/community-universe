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
  }

  span {
    position: absolute;
  }
</style>
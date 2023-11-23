<script>
  export let id;
	export let options = [1, 2, 3, 4, 5];
  export let value = 3;
</script>

<fieldset class="scoring-input">
	{#each options as option}
		<label>
			<input
				type="radio"
        id="{id}-{option}"
				name={id}
				value={option}
        checked={option === value}
        on:change={() => value = option}
			/>
			{option}
		</label>
	{/each}
</fieldset>

<style>
  .scoring-input {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>

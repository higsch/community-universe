<script>
	export let showLabels = false;
</script>

<header>
	<h2>Alenka Guček and Matthias Stahl</h2>
	<h1>Embracing Serendipity</h1>
	<p>
		This website was a <b>talk and presentation</b> during the <a
			href="https://informationplusconference.com">Information+ conference</a
		> in Edinburgh, 2023. Please see further notes at the bottom of the page.
	</p>
	<p>
		Each star represents the identity and skillset of <b>94 persons</b> in the audience
		on November, 24.
	</p>
	<div class="show-labels">
		<label for="check-show-labels">Show names, if present</label>
		<input
			id="check-show-labels"
			type="checkbox"
			bind:checked={showLabels}
		/>
	</div>
</header>

<style>
	header {
    display: flex;
    flex-direction: column;
    align-items: center;
		width: 100%;
		padding: 1rem;
		background: #213240;
	}

	h1,
	h2,
	p {
		margin: 0;
		padding: 0;
		text-align: center;
	}

	h1 {
		font-family: Handlee;
	}

	h2 {
		font-size: 0.9rem;
		font-weight: normal;
	}

	p {
		font-size: 0.8rem;
	}

  .show-labels {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .show-labels label {
    font-size: 0.8rem;
  }
</style>

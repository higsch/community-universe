<script>
	export let x;
	export let y;
	export let src;
	export let alt;
  export let dimension;

	let isOpen = false;
</script>

<button
	on:click={() => (isOpen = !isOpen)}
	style:top={y}
	style:left={x}
  style:--dimension={dimension}
  class:is-open={isOpen}
>
	<figure class="career-image">
		<img
			src={src}
			alt={alt}
		/>
	</figure>
</button>

<style>
	button {
    all: unset;
		position: absolute;
    z-index: 500;
    display: flex;
    transform: translate(-50%, -50%);
    cursor: pointer;
	}

  figure {
    width: 70px;
    height: 70px;
    border: 3px solid var(--card-background-color);
    border-radius: 50%;
    background: white;
    transition: all 0.3s ease-in-out;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  button.is-open figure {
    width: var(--dimension);
    height: var(--dimension);
    border-width: 7px;
  }
</style>

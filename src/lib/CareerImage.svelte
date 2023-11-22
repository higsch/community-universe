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
    margin: 0;
    border: 3px solid var(--card-background-color);
    border-radius: 50%;
    background: white;
    transition: all 0.3s ease-in-out;
  }
  
  figure:hover {
    box-shadow: rgba(72, 135, 202, 0.8) 0 0 32px 32px;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  button.is-open {
    z-index: 1000;
  }

  button.is-open figure {
    width: var(--dimension);
    height: var(--dimension);
    border-width: 7px;
  }
</style>

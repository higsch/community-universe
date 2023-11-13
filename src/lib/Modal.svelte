<script>
	export let isOpen = false;
</script>

<dialog open={isOpen}>
	<article>
		<header>
			<slot name="header" />
			<!-- svelte-ignore a11y-invalid-attribute -->
			<!-- svelte-ignore a11y-missing-content -->
			<a
				class="close"
				href="javascript:void(0)"
				on:click={() => (isOpen = false)}
			></a>
		</header>
		<section>
			<slot />
		</section>
		<!-- <footer>
			<slot name="footer" />
		</footer> -->
	</article>
</dialog>

<style>
	a {
		cursor: pointer;
	}
</style>
